import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../css/Category.css"
import { CategoryContext } from "../providers/CategoryProvider";

export const Category = ({ category }) => {

    const { deleteCategory, updateCategory } = useContext(CategoryContext)

    const name = useRef()

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const catUpdate = () => {
        updateCategory({
            id: category.id,
            name: name.current.value
        }).then(toggleEdit)
    }

    return (
        <Card className="categoryCard">
            <CardBody>
                <div className="categoryCardBody">
                    <h4>{category.name}</h4>
                    <div>
                        {/* This is the edit button and Modal */}
                        <Button color="primary" onClick={toggleEdit}>Edit</Button>

                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalHeader toggle={toggleEdit}>
                                {category.name}
                            </ModalHeader>
                            <ModalBody className="categoryModalBody">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        ref={name}
                                        required
                                        autoFocus
                                        className="form-control"
                                        defaultValue={category.name}
                                    />
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault() // Prevent browser from submitting the form
                                                toggleEdit()
                                            }
                                        }
                                        className="btn btn-primary">
                                        Cancel
            </button>
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault() // Prevent browser from submitting the form

                                                catUpdate()


                                            }
                                        }
                                        className="btn btn-primary">
                                        Save Changes
            </button>
                                </div>
                            </ModalBody>
                        </Modal>

                        {/* this is the delete button and modal */}
                        <Button color="danger" onClick={toggle}>Delete</Button>

                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                                Delete {category.name}?
                </ModalHeader>
                            <ModalBody className="categoryModalBody">
                                <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault() // Prevent browser from submitting the form
                                            toggle()
                                        }
                                    }
                                    className="btn btn-primary">
                                    Cancel
            </button>
                                <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault() // Prevent browser from submitting the form

                                            deleteCategory(category.id).then(toggle)
                                        }
                                    }
                                    className="btn btn-danger">
                                    Delete
            </button>
                            </ModalBody>
                        </Modal>

                    </div>
                </div>
            </CardBody>
        </Card>

    )

}



