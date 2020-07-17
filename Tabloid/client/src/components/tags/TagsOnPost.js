import React from "react";
export const TagsOnPost = ({ postTag }) => {

    return (
        <div className="individualTagContainer">
            <p className="individualTag">{postTag.tag.name}</p>
        </div>
    )
}