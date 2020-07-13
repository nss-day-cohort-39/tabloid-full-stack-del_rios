import React, { useContext, useEffect, useState, useRef } from "react";
import { Tag } from "./Tag"
import { TagContext } from "../../providers/TagProvider"
import { Button } from "reactstrap";

export const TagList = () => {

    const { tags, getAllTags } = useContext(TagContext)
    const name = useRef()


    useEffect(() => {
        getAllTags();
    }, []);


    return (
        <section>
            <div className="tagHeader">
                <h2>Tags</h2>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            setTagInput(true)
                        }
                    }
                    className="btn btn-primary">
                    Add a Tag
            </button>
            </div>

            <div>{displayTagInput()}</div>

            <div className="tagsContainer">
                {tags.map(t =>
                    <Tag key={t.id} tag={t} />)}
            </div>

        </section>
    );
}
