import React, { useState, useContext, useEffect, useRef } from "react";
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Tag.css"
export const TagsOnPost = ({ postTag }) => {

    return (
        <div className="individualTagContainer">
            <p className="individualTag">{postTag.tag.name}</p>
        </div>
    )
}