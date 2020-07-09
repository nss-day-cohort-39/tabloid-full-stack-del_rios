import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, CardImg } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useParams } from "react-router-dom";
import Post from "./Post";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { getPost } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  if (!post) {
    return null;
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <ListGroup>
              <ListGroupItem> <strong>Title: </strong>{post.title}</ListGroupItem>
              <ListGroupItem> <CardImg top src={post.imageLocation} alt={post.title} /></ListGroupItem>
              <ListGroupItem>{post.content}</ListGroupItem>
              <ListGroupItem><strong>Posted: </strong>{post.publishDateTime}</ListGroupItem>
              <ListGroupItem><strong>Posted By: </strong>{post.userProfile.displayName}</ListGroupItem>

          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;