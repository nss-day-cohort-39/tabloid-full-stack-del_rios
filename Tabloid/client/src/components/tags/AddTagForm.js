import React, { useContext, useEffect } from "react";
import { AddTag } from "./AddTag"
import { TagContext } from "../../providers/TagProvider"
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export const AddTagForm = () => {

    const { tags, getAllTags } = useContext(TagContext)
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getAllTags();
    }, []);


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
                    <AddTag key={t.id} tag={t} />)}
            </div>

        </section>
    );
}
