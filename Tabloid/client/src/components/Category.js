import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../css/Category.css"
import { CategoryContext } from "../providers/CategoryProvider";

export const Category = ({ category }) => {

    const { deleteCategory } = useContext(CategoryContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <Card className="categoryCard">
            <CardBody>
                <div className="categoryCardBody">
                    <h4>{category.name}</h4>
                    <div>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault() // Prevent browser from submitting the form

                                }
                            }
                            className="btn btn-primary">
                            Edit
            </button>
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



