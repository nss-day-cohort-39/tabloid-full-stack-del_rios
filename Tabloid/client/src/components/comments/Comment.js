import React, { useContext } from "react";
import { CommentContext } from "../../providers/CommentProvider";




export const Comment = (comment) => {
    debugger


    return (
        <div> {comment.comment.subject}</div>
    )
}