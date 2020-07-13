import React, { useContext, useState, useRef } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button } from "reactstrap";



export const Comment = (comment) => {
    const { updateComment } = useContext(CommentContext)
    const unformatedDate = comment.comment.createDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    const formatedDate = month + "/" + day + "/" + year;
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const [editComment, setEditComment] = useState(false)
    const subject = useRef()
    const content = useRef()

    const updateThisComment = () => {

        const updatedComment = {
            id: comment.comment.id,
            userProfileId: userProfileId,
            postId: comment.comment.postId,
            subject: subject.current.value,
            content: content.current.value,
            createDateTime: new Date()

        }
        updateComment(updatedComment.id, updatedComment)

    }

    if (userProfileId !== comment.comment.userProfile.id) {

        return (

            <>
                <div className="comment">
                    <div>Subject: {comment.comment.subject}</div>
                    <div>Content: {comment.comment.content}</div>
                    <div>Date Posted: {formatedDate}</div>
                    <div>Author: {comment.comment.userProfile.displayName}</div>
                </div>
            </>
        )
    }
    else if (userProfileId === comment.comment.userProfile.id && editComment === false) {

        return (
            <>
                <div className="comment">
                    <div>Subject: {comment.comment.subject}</div>
                    <div>Content: {comment.comment.content}</div>
                    <div>Date Posted: {formatedDate}</div>
                    <div>Author: {comment.comment.userProfile.displayName}</div>
                    <Button onClick={e => {
                        e.preventDefault()
                        setEditComment(true)
                    }
                    }
                        color="warning">Edit Post</Button>
                    <Button color="danger">Delete Post</Button>
                </div>
            </>
        )
    }

    else if (userProfileId === comment.comment.userProfile.id && editComment === true) {

        return (
            <>
                <div calssName="comment">

                    <input
                        type="text"
                        id="name"
                        ref={subject}
                        required
                        autoFocus
                        className="form-control"
                        defaultValue={comment.comment.subject}
                    />
                    <input
                        type="text"
                        id="name"
                        ref={content}
                        required
                        autoFocus
                        className="form-control"
                        defaultValue={comment.comment.content}
                    />
                    <div>Date Posted: {formatedDate}</div>
                    <div>Author: {comment.comment.userProfile.displayName}</div>
                    <Button onClick={e => {
                        e.preventDefault()
                        updateThisComment()

                    }
                    }
                        color="primary">Save Changes</Button>

                </div>
            </>)

    }
}