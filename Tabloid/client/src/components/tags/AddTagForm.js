import React, { useContext, useEffect, useState, useRef } from "react";
import { AddTag } from "./AddTag"
import { TagContext } from "../../providers/TagProvider"

export const AddTagForm = () => {

    const { tags, getAllTags } = useContext(TagContext)

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
