
import { Card, CardBody, CardFooter, Button } from "reactstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import React, { useState, useContext, useEffect } from "react";

const Post = ({ post }) => {
  const userProfileType = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
  const { editPost, getAllPosts, getUserPost } = useContext(PostContext);
  const [postEdit, setEditPost] = useState();
  const { id } = useParams();
  let location = useLocation();

  useEffect(() => {
    setEditPost(post);
  }, []);

  const updatePost = () => {
    postEdit.isApproved = !postEdit.isApproved;
    editPost(postEdit.id, postEdit).then(() => {
      if (location.pathname === "/") {
        getAllPosts();
      } else {
        getUserPost(id)
      }
    })
  };


  if (userProfileType == 1) {
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
        {(post.isApproved == true) ?
          <Button onClick={updatePost} color="danger">Unapprove this Post</Button>
          : <Button onClick={updatePost} color="success">Approve this Post</Button>
        }   </Card>
    )
  }
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