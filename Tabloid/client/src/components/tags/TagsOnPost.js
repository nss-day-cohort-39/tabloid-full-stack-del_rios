import React from "react";
import "../../css/Tag.css"
export const TagsOnPost = ({ postTag }) => {

    return (
        <div className="individualTagContainer">
            <p className="individualTag">{postTag.tag.name}</p>
        </div>
    )
}