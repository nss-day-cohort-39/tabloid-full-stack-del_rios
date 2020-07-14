import React, { useContext, useEffect, useState, useRef } from "react";
import { AddTag } from "./AddTag"
import { TagContext } from "../../providers/TagProvider"
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";

export const AddTagForm = () => {

    const { tags, getAllTags } = useContext(TagContext)
    // const { id } = useParams();

    // const { getPost } = useContext(PostContext)
    // const [post, setPost] = useState()

    // useEffect(() => {
    //     getPost(parseInt(id)).then(setPost);
    // }, []);



    useEffect(() => {
        getAllTags();
    }, []);


    return (
        <section>
            <div className="tagHeader">
                <h2>Tags</h2>
            </div>

            <div className="tagsContainer">
                {tags.map(t =>
                    <AddTag key={t.id} tag={t} />)}
            </div>

        </section>
    );
}
