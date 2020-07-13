import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import "../../css/Tag.css"
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";

export const AddTag = ({ tag }) => {

    const { addTagtoPost } = useContext(PostContext)
    const { id } = useParams();

    let postTag = {}

    const addThisTag = (tagId) => {
        addTagtoPost(
            postTag =
            {
                postId: parseInt(id),
                TagId: tagId
            }
        )
    }

    return (
        <Card className="tagCard">
            <CardBody>
                <div className="tagCardBody">
                    <h4>{tag.name}</h4>
                    <div className="tagButtonContainer">

                        <Button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault() // Prevent browser from submitting the form
                                    addThisTag(tag.id)
                                }}
                            className="btn btn-danger">
                            Add Tag to Post
                            </Button>
                    </div>
                </div>
            </CardBody>
        </Card>

    )

}



