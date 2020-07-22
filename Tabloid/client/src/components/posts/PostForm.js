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
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from "react-router-dom";

export const PostForm = () => {
  const { addPost } = useContext(PostContext);
  const { getAllCategories, categories } = useContext(CategoryContext);
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const userType = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
  const [formState, setformState] = useState({ userProfileId: +userProfileId });

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "brennen");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dxpkkasks/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  const handleUserInput = (e) => {
    const updatedState = { ...formState };
    updatedState[e.target.id] = e.target.value;
    setformState(updatedState);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    if (userType === 1) {
      formState.isApproved = true;
    } else {
      formState.isApproved = false;
    }
    formState.imageLocation = image;
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
                <Label for="headerImage">Upload Header Image</Label>
                <div>
                  <Input
                    type="file"
                    name="file"
                    placeholder="Upload image here"
                    onChange={uploadImage}
                  />
                  {loading ? (
                    <h4>Loading...</h4>
                  ) : (
                    <img src={image} style={{ width: "100px" }} alt=" " />
                  )}
                </div>
              </FormGroup>

              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" onChange={handleUserInput} required />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input id="content" onChange={handleUserInput} required />
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
                <select id="categoryId" required onChange={handleUserInput}>
                  <option value=""> Choose Category</option>
                  {categories.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    );
                  })}
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
