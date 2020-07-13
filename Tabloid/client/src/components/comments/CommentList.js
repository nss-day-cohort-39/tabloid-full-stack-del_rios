import React, { useContext } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Comment } from "./Comment";



export const CommentList = () => {

    const { comments } = useContext(CommentContext)

    return (
        <div>

            {comments.map(c => <Comment key={c.id} comment={c} />)}
        </div>
    )
}