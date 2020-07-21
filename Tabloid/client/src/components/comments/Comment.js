import React, { useContext, useState, useRef } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button, Card, Toast, ToastBody, ToastHeader } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";



export const Comment = ({ comment, setPost }) => {
    const { updateComment, deleteComment } = useContext(CommentContext)
    const { getPost } = useContext(PostContext)

    const unformatedDate = comment.createDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    const formatedDate = month + "/" + day + "/" + year;
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const userTypeId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
    const [editComment, setEditComment] = useState(false)
    const subject = useRef()
    const content = useRef()
    const [showToast, setShowToast] = useState(false);
    const toggleToast = () => setShowToast(!showToast);

    const nukeComment = (e) => {
        e.preventDefault();

        deleteComment(comment.id).then(getPost(comment.postId).then(post => setPost(post)).then(toggleToast));
    };

    const updateThisComment = () => {

        const updatedComment = {
            id: comment.id,
            userProfileId: userProfileId,
            postId: comment.postId,
            subject: subject.current.value,
            content: content.current.value,
            createDateTime: new Date()

        }
        updateComment(updatedComment.id, updatedComment).then(() => {
            getPost(updatedComment.postId).then(post => setPost(post));
        });
    }

    if (userProfileId !== comment.userProfile.id) {
        return (
            <>
                <Card className="comment">
                    <div className="commentInfoContainer">
                        <p><strong>Author: </strong>{comment.userProfile.displayName}</p>
                        <p><strong>Date Posted: </strong>{formatedDate}</p>
                    </div>
                    <div><strong>Subject: </strong>{comment.subject}</div>
                    <div><strong>Content: </strong>{comment.content}</div>
                    <div className="buttonContainer">
                        {
                            (userTypeId === 1)
                                ? <Button onClick={e => {
                                    e.preventDefault()
                                    toggleToast();
                                }
                                } color="danger">Delete Comment</Button>
                                : ""
                        }
                    </div>
                </Card>
            </>
        )
    }
    else if (userProfileId === comment.userProfile.id && editComment === false) {

        return (
            <>
                <div className="p-3 my-2 rounded">
                    <Toast isOpen={showToast}>
                        <ToastHeader className="bg-danger">
                            Warning
                        </ToastHeader>
                        <ToastBody>
                            Are you certain that you wish to delete the comment: {comment.subject}
                        </ToastBody>
                        <div className="buttonContainer">
                            <Button onClick={toggleToast} color="primary">No, Cancel</Button><Button onClick={nukeComment} color="danger">Yes, Delete Comment</Button>
                        </div>
                    </Toast>
                </div>

                <Card className="comment">
                    <div className="commentInfoContainer">
                        <p><strong>Author: </strong>{comment.userProfile.displayName}</p>
                        <p><strong>Date Posted: </strong>{formatedDate}</p>
                    </div>
                    <div><strong>Subject: </strong>{comment.subject}</div>
                    <div><strong>Content: </strong>{comment.content}</div>
                    <div className="buttonContainer">
                        <Button onClick={e => {
                            e.preventDefault()
                            setEditComment(true)
                        }
                        }
                            color="warning">Edit Comment</Button>
                        <Button onClick={e => {
                            e.preventDefault()
                            toggleToast();
                        }
                        } color="danger">Delete Comment</Button>
                    </div>
                </Card>
            </>
        )
    }

    else if (userProfileId === comment.userProfile.id && editComment === true) {

        return (
            <>
                <Card className="comment">
                    <div className="commentInfoContainer">
                        <p><strong>Author: </strong>{comment.userProfile.displayName}</p>
                        <p><strong>Date Posted: </strong>{formatedDate}</p>
                    </div>
                    <label><strong>Subject: </strong></label>
                    <input
                        type="text"
                        id="subject"
                        ref={subject}
                        required
                        autoFocus
                        className="form-control"
                        defaultValue={comment.subject}
                    />
                    <label><strong>Content: </strong></label>
                    <input
                        type="text"
                        id="content"
                        ref={content}
                        required
                        autoFocus
                        className="form-control"
                        defaultValue={comment.content}
                    />
                    <div className="buttonContainer">
                        <Button onClick={e => {
                            e.preventDefault()
                            updateThisComment()
                            setEditComment(false)
                        }
                        }
                            color="success">Save Changes</Button>
                        <Button onClick={e => {
                            e.preventDefault()
                            setEditComment(false)
                        }
                        }
                            color="warning">Cancel Edit</Button>
                    </div>
                </Card>
            </>)

    }
}