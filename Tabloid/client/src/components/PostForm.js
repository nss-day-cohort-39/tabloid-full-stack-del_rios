import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import { useHistory } from "react-router-dom";

export const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const { getAllCategories, categories } = useContext(CategoryContext)
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const [formState, setformState] = useState({ userProfileId: +userProfileId });

    const handleUserInput = (e) => {
        const updatedState = { ...formState }
        updatedState[e.target.id] = e.target.value
        setformState(updatedState)
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();

        formState.isApproved = true;
        formState.categoryId = +formState.categoryId;

        addPost(formState).then((p) => {
            history.push(`/post/${p.id}`);
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form onSubmit={submit}>
                            <FormGroup>
                                <Label for="imageLocation">Image URL</Label>
                                <Input
                                    id="imageLocation"
                                    type="url"
                                    onChange={handleUserInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" onChange={handleUserInput} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input
                                    id="content"
                                    onChange={handleUserInput}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="publishDateTime">Publication Date</Label>
                                <Input
                                    id="publishDateTime"
                                    type="date"
                                    onChange={handleUserInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Category:</Label>
                                <select id="categoryId" onChange={handleUserInput}>
                                    {
                                        categories.map(c => {
                                            return <option key={c.id} value={c.id}>{c.name}</option>
                                        })
                                    }
                                </select>
                            </FormGroup>
                            <div className="buttonContainer">
                                <Button color="info" type="submit">
                                    SUBMIT POST
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};