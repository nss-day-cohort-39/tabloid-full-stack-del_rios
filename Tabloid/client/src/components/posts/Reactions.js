import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";

export const Reactions = ({ reaction }) => {

    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const { getPost, addReactiontoPost, removeReactionFromPost } = useContext(PostContext);
    const { id } = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        getPost(id).then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    // Code for reacting to posts
    const currentPostReactions = post.postReactions.filter(pr => pr.PostId === post.Id)

    const numberOfReacts = currentPostReactions.filter(pr => pr.reactionId === reaction.id).length

    const postReactionRelationship = post.postReactions.find(pr => pr.reactionId === reaction.id && pr.userProfileId === userProfileId)


    const addReaction = (reactionId) => {
        addReactiontoPost({
            PostId: parseInt(id),
            ReactionId: reactionId,
            UserProfileId: userProfileId
        }).then(() => {
            getPost(parseInt(id)).then(setPost)
        })
    }

    return (
        <div><img src={"" + reaction.imageLocation} alt={reaction.name} onClick={
            evt => {
                evt.preventDefault()
                {
                    (!post.postReactions.find(pr => pr.reactionId === reaction.id && pr.userProfileId === userProfileId))
                        ? addReaction(reaction.id)
                        : removeReactionFromPost(postReactionRelationship.id).then(() => {
                            getPost(parseInt(id)).then(setPost)
                        })
                }
            }}></img> {numberOfReacts} </div >
    )
}