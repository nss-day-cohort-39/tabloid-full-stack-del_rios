import React from "react";
import { Card, CardBody } from "reactstrap";



export const Category = ({ category }) => {

    return (
        <Card>
            <CardBody>
                <h3>{category.name}</h3>
            </CardBody>
        </Card>

    )

}



