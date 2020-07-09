import React, { useContext, useEffect } from "react";
import { Category } from "./Category"
import { CategoryContext } from "../providers/CategoryProvider"

export const CategoryList = () => {

    const { categories, getAllCategories } = useContext(CategoryContext)

    useEffect(() => {
        getAllCategories();
    }, []);


    return (
        <section>
            {categories.map(c =>
                <Category key={c.id} category={c} />)}

        </section>
    );
}

