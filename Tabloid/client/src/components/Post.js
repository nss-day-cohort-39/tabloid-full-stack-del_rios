import React from "react";
import { Card, CardImg, CardBody, CardFooter } from "reactstrap";
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
      <CardFooter>
        Post Category: {post.category.name}
      </CardFooter>
    </Card>
  );
}

export default Post;