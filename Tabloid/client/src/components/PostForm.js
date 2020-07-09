import React, { useState, useContext } from "react";
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
import { useHistory } from "react-router-dom";

export const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [formState, setformState] = useState({});

    const handleUserInput = (e) => {
        const updatedState = { ...formState }
        updatedState[e.target.id] = e.target.value
        setformState(updatedState)
    }

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();

        formState.userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
        formState.userProfileId = +formState.userProfileId;
        formState.isApproved = true;
        formState.categoryId = 1;

        addPost(formState).then((p) => {
            history.push(`/post/:${p.id}`);
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
                                    required
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
                                    required
                                />
                            </FormGroup>
                            <Button color="info" type="submit">
                                SUBMIT POST
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};