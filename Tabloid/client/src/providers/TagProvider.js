import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {

    const apiUrl = "/api/tag";

    const { getToken } = useContext(UserProfileContext);
    const [tags, setTags] = useState([]);

    const getAllTags = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTags));

    const addTag = (tag) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(getAllTags);
                }
                throw new Error("Unauthorized");
            }));

    const updateTag = (tag) =>
        getToken().then((token) =>
            fetch(`api/tag/${tag.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            }).then(getAllTags));

    const deleteTag = (id) => {
        return getToken().then((token) =>
            fetch(`/api/tag/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete tag.")
            })
        );
    };

    const getTagById = (id) => {
        getToken().then((token) =>
            fetch(`/api/tag/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }

    return (
        <TagContext.Provider value={{ tags, getAllTags, addTag, updateTag, deleteTag, getTagById }}>
            {props.children}
        </TagContext.Provider>
    );
};