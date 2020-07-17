import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReactionContext = React.createContext();

export const ReactionProvider = (props) => {

    const apiUrl = "/api/reaction";

    const { getToken } = useContext(UserProfileContext);
    const [reactions, setReactions] = useState([]);

    const getAllReactions = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setReactions));

    const addReaction = (reaction) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reaction)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(getAllReactions);
                }
                throw new Error("Unauthorized");
            }));

    const updateReaction = (reaction) =>
        getToken().then((token) =>
            fetch(`api/reaction/${reaction.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reaction)
            }).then(getAllReactions));

    const deleteReaction = (id) => {
        return getToken().then((token) =>
            fetch(`/api/reaction/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete reaction.")
            })
        ).then(getAllReactions);;
    };

    const getReactionById = (id) => {
        getToken().then((token) =>
            fetch(`/api/reaction/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }

    return (
        <ReactionContext.Provider value={{ reactions, getAllReactions, addReaction, updateReaction, deleteReaction, getReactionById }}>
            {props.children}
        </ReactionContext.Provider>
    );
};