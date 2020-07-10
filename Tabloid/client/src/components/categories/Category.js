import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Category.css"
import { CategoryContext } from "../../providers/CategoryProvider";

export const Category = ({ category }) => {

    const { categories, getAllCategories, updateCategory } = useContext(CategoryContext)
    const name = useRef()

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const catUpdate = () => {
        updateCategory({
            id: category.id,
            name: name.current.value,
            active: true
        }).then(toggleEdit)
    }

    const catDelete = () => {
        updateCategory({
            id: category.id,
            name: category.name,
            active: !category.active
        }).then(toggle)
    }

    return (
        <Card className="categoryCard">
            <CardBody>
                <div className="categoryCardBody">
                    <h4>{category.name}</h4>
                    <div className="categoryButtonContainer">
                        {/* This is the edit button and Modal */}
                        <Button color="primary" onClick={toggleEdit}>Edit</Button>

                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalHeader toggle={toggleEdit}>
                                Edit {category.name}
                            </ModalHeader>
                            <ModalBody >
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
                                    <div className="categoryModalBody">
                                        <button type="submit"
                                            onClick={
                                                evt => {
                                                    evt.preventDefault() // Prevent browser from submitting the form
                                                    toggleEdit()
                                                }
                                            }
                                            className="btn btn-secondary">
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
                                            catDelete()

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



