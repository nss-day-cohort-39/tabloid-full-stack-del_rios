import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import "../../css/Tag.css"
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";


export const AddTag = ({ tag }) => {

    const { addTagtoPost, removeTagFromPost, getPost } = useContext(PostContext);
    const { id } = useParams();

    const [post, setPost] = useState();

    useEffect(() => {
        getPost(parseInt(id)).then(setPost);
    }, []);


    const addThisTag = (tagId) => {
        addTagtoPost({
            postId: parseInt(id),
            TagId: tagId
        })
    }

    if (!post) {
        return null;
    }

    return (
        <Card className="tagCard">
            <CardBody>
                <div className="tagCardBody">
                    <h4>{tag.name}</h4>
                    <div className="tagButtonContainer">

                        {
                            (!post.postTags.find(pt => pt.tagId === tag.id))
                                ? <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault() // Prevent browser from submitting the form
                                            addThisTag(tag.id)
                                        }}
                                    className="btn btn-primary">
                                    Add Tag to Post
                            </button>

                                : <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault() // Prevent browser from submitting the form

                                            removeTagFromPost(post.postTags)
                                        }}
                                    className="btn btn-danger">
                                    Remove Tag From Post
                        </button>
                        }
                    </div>
                </div>
            </CardBody>
        </Card>

    )

}



