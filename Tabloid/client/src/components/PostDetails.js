import React, { useEffect, useContext, useState } from "react";
import { Button, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { getPost, deletePostById } = useContext(PostContext);
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => setShowToast(!showToast);

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }

  const deletePost = (e) => {
    e.preventDefault();
    debugger

    deletePostById(post.id).then((p) => {
      history.push("/");
    });
  };

  const unformatedDate = post.publishDateTime.split("T")[0];
  const [year, month, day] = unformatedDate.split("-");
  const formatedDate = month + "/" + day + "/" + year;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <div className="p-3 my-2 rounded">
            <Toast isOpen={showToast}>
              <ToastHeader className="bg-danger">
                Warning
              </ToastHeader>
              <ToastBody>
                Are you certain that you wish to delete the post: {post.title}
              </ToastBody>
              <Button onClick={toggleToast} color="primary">No, Cancel</Button><Button onClick={deletePost} color="danger">Yes, Delete Post</Button>
            </Toast>
          </div>

          <ListGroup>
            <ListGroupItem> <strong>Title: </strong>{post.title}</ListGroupItem>
            <ListGroupItem> <CardImg top src={post.imageLocation} alt={post.title} /></ListGroupItem>
            <ListGroupItem>{post.content}</ListGroupItem>
            <ListGroupItem><strong>Posted: </strong>{formatedDate}</ListGroupItem>
            <ListGroupItem><strong>Posted By: </strong>{post.userProfile.displayName}</ListGroupItem>
            <ListGroupItem className="detailsButtonContainer"><Button onClick={toggleToast} color="warning">Edit Post</Button><Button onClick={toggleToast} color="danger">Delete Post</Button></ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;