import React, { useState, useContext, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import "../../css/Tag.css"

export const Tag = ({ tag }) => {

    const { updateTag, deleteTag } = useContext(TagContext)
    const name = useRef()

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const tagUpdate = () => {
        updateTag({
            id: tag.id,
            name: name.current.value,
        }).then(toggleEdit)
    }

    const tagDelete = () => {
        deleteTag(tag.id).then(toggle)
    };

    return (
        <Card className="tagCard">
            <CardBody>
                <div className="tagCardBody">
                    <h4>{tag.name}</h4>
                    <div className="tagButtonContainer">
                        {/* This is the edit button and Modal */}
                        <Button color="primary" onClick={toggleEdit}>Edit</Button>

                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalHeader toggle={toggleEdit}>
                                Edit {tag.name}
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
                                        defaultValue={tag.name}
                                    />
                                    <div className="tagModalBody">
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
                                                    tagUpdate()
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
                                Delete {tag.name}?
                </ModalHeader>
                            <ModalBody className="tagModalBody">
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
                                            tagDelete()

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



