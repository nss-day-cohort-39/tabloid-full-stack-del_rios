import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {

    const apiUrl = "/api/category";

    const { getToken } = useContext(UserProfileContext);
    const [categories, setCategories] = useState([]);

    const getAllCategories = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories));

    const addCategory = (category) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const getCategory = (id) => {
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
        <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, getCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};