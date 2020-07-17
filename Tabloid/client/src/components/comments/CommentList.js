import React, { useContext, useRef, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PostContext } from "../../providers/PostProvider";
import { Comment } from "./Comment";
import { Button } from "reactstrap";



export const CommentList = ({ comments, setPost, postId }) => {
    const { addComment } = useContext(CommentContext);
    const { getPost } = useContext(PostContext)
    const [commentInput, setCommentInput] = useState(false);
    const [commentButton, setCommentButton] = useState(true);
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const subject = useRef();
    const content = useRef();

    const createComment = () => {
        const commentObject = {
            subject: subject.current.value,
            content: content.current.value,
            userProfileId: userProfileId,
            postId: postId,
            createDateTime: new Date()
        }

        addComment(commentObject).then(e => {
            getPost(postId).then(post => setPost(post));
            setCommentInput(false);
            setCommentButton(true);
        });
    };

    const displayCommentButton = () => {
        if (commentButton === true) {
            return (
                <div>
                    <Button onClick={e => {
                        e.preventDefault();
                        setCommentInput(true);
                        setCommentButton(false);

                    }
                    }
                        color="success">Create Comment</Button>
                </div>
            )
        }
    }

    const displayCommentInput = () => {
        if (commentInput === true) {
            return (
                <div className="form-group">
                    <label><strong>Subject: </strong></label>
                    <input
                        type="text"
                        id="subject"
                        ref={subject}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Subject"
                    />
                    <label><strong>Content: </strong></label>
                    <input
                        type="text"
                        id="content"
                        ref={content}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Content"
                    />
                    <div className="buttonContainer">
                        <Button onClick={e => {
                            e.preventDefault();
                            createComment();
                        }
                        }
                            color="success">Save Comment</Button>
                        <Button onClick={e => {
                            e.preventDefault();
                            setCommentInput(false);
                            setCommentButton(true);
                        }
                        }
                            color="warning">Cancel</Button>
                    </div>
                </div>)
        }
    }

    if (comments.length) {
        return (
            <div>
                <div className="buttonContainer">{displayCommentButton()}</div>
                <div>{displayCommentInput()}</div>
                {
                    comments.map(c => <Comment key={c.id} comment={c} setPost={setPost} />)
                }
            </div>
        )
    }
    else {
        return (
            <>
                <div>{displayCommentInput()}</div>
                <div>{displayCommentButton()}</div>
                <div>There are no comments to display</div>
            </>
        )
    }
}