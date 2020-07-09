import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {

  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
      <CardBody>
        <Link to={`/post/${post.id}`}>
          <strong>{post.title}</strong>
        </Link>
      </CardBody>
    </Card>
  );
}

export default Post;