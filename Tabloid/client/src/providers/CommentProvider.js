import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

    const apiUrl = "/api/comment";

    const { getToken } = useContext(UserProfileContext);
    const [comments, setComments] = useState([]);

    const getAllComments = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));

    const addComment = (comment) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(getAllComments);
                }
                throw new Error("Unauthorized");
            }));

    const updateComment = (comment) =>
        getToken().then((token) =>
            fetch(`api/category/${comment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(getAllComments));

    const deleteComment = (id) =>
        getToken().then((token) =>
            fetch(`api/category/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            }).then(getAllComments));

    const getComment = (id) => {
        getToken().then((token) =>
            fetch(`/api/category/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }


    return (
        <CommentContext.Provider value={{ comments, getAllComments, addComment, getComment, updateComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
};