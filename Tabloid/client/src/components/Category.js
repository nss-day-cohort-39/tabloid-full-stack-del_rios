import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import "../css/Category.css"
import { CategoryContext } from "../providers/CategoryProvider";


export const Category = ({ category }) => {

    const { deleteCategory } = useContext(CategoryContext)

    return (
        <Card className="categoryCard">
            <CardBody>
                <div className="categoryCardBody">
                    <h4>{category.name}</h4>
                    <div>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault() // Prevent browser from submitting the form

                                }
                            }
                            className="btn btn-primary">
                            Edit
            </button>
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault() // Prevent browser from submitting the form
                                    deleteCategory(category.id)
                                }
                            }
                            className="btn btn-danger">
                            Delete
            </button>
                    </div>
                </div>
            </CardBody>
        </Card>

    )

}



