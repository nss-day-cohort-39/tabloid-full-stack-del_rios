import React, { useContext, useEffect, useState } from "react";
import { AddTag } from "./AddTag"
import { TagContext } from "../../providers/TagProvider"
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";

export const AddTagForm = () => {

    const { tags, getAllTags } = useContext(TagContext)
    const { getPost } = useContext(PostContext);
    const history = useHistory();
    const { id } = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        getPost(parseInt(id)).then(setPost);
    }, []);

    useEffect(() => {
        getAllTags();
    }, []);

    if (!post) {
        return null;
    }

    return (
        <section>
            <div className="tagHeader">
                <h2>Tags</h2>
            </div>
            <div className="buttonContainer">
                <Button onClick={(e) => {
                    e.preventDefault();
                    history.push(`/post/${id}`);
                }}>Return to Post</Button>
            </div>

            <div className="tagsContainer">
                {tags.map(t =>
                    <AddTag key={t.id} tag={t} currentPost={post} />)}
            </div>

        </section>
    );
}
