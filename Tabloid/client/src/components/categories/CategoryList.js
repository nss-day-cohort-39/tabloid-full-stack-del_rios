import React, { useContext, useEffect, useState, useRef } from "react";
import { Category } from "./Category"
import { CategoryContext } from "../../providers/CategoryProvider"
import { Button } from "reactstrap";

export const CategoryList = () => {

    const { categories, getAllCategories, addCategory } = useContext(CategoryContext)
    const [categoryInput, setCategoryInput] = useState(false)
    const name = useRef()


    useEffect(() => {
        getAllCategories();
    }, []);

    const constructNewCategory = () => {
        if (name.current.value !== "") {
            addCategory({
                name: name.current.value,
            })
        }
        else {
            return
        }
    }

    const displayCategoryInput = () => {
        if (categoryInput === true) {
            return (
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        ref={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="New Category"
                    />
                    <button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault() // Prevent browser from submitting the form
                                constructNewCategory()
                                setCategoryInput(false)
                            }
                        }
                        className="btn btn-primary">
                        Save Category
            </button>
                </div>)
        }
    }

    return (
        <section>
            <div className="categoryHeader">
                <h2>Categories</h2>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            setCategoryInput(true)
                        }
                    }
                    className="btn btn-primary">
                    Add a Category
            </button>
            </div>

            <div>{displayCategoryInput()}</div>

            <div className="categoriesContainer">
                {categories.map(c =>
                    <Category key={c.id} category={c} />)}
            </div>

        </section>
    );
}
