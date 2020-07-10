import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

export const Tag = ({ tag }) => {

    const { tags, updateTag, deleteTag } = useContext(TagContext)
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

    const deleteTag = (e) => {
        e.preventDefault();

        deleteTag(tag.id).then((p) => {
            history.push("/");
        });
    };

    return (
        <Card className="TagCard">
            <CardBody>
                <div className="TagCardBody">
                    <h4>{tag.name}</h4>
                    <div className="TagButtonContainer">
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
                                    <div className="TagModalBody">
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
                            <ModalBody className="TagModalBody">
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



