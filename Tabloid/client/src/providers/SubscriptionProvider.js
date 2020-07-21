import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {

    const apiUrl = "/api/subscription";

    const { getToken } = useContext(UserProfileContext);
    const [subs, setSubs] = useState([]);
    const [subPosts, setSubPosts] = useState([]);

    const getAllSubPosts = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setSubPosts));

    const addSub = (sub) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sub)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(getAllSubPosts);
                }
                throw new Error("Unauthorized");
            }));


    const deleteSub = (id) => {
        return getToken().then((token) =>
            fetch(`/api/subscription/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((resp) => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Failed to delete subscription.")
            })
        ).then(getAllSubPosts);;
    };

    const getSubById = (id) => {
        getToken().then((token) =>
            fetch(`/api/subscription/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }

    return (
        <SubscriptionContext.Provider value={{ subs, setSubs, subPosts, setSubPosts, getAllSubPosts, addSub, deleteSub, getSubById }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
};