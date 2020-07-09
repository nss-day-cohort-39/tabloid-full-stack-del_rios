import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.author}</p>
      <CardBody>
      <Link to={`/posts/${post.id}`}>
    <strong>{post.title}</strong>
        </Link>
        <p>{post.author}</p>
        <p>{post.category}</p>
      </CardBody>
    </Card>
  );
};

export default Post;