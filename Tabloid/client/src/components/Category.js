import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import "../css/Category.css"


export const Category = ({ category }) => {

    return (
        <Card className="categoryCard">
            <CardBody>
                <div className="categoryCardBody">
                    <h4>{category.name}</h4>
                    <div>
                        <Button color="primary">Edit</Button>
                        <Button color="danger">Delete</Button>
                    </div>
                </div>
            </CardBody>
        </Card>

    )

}



