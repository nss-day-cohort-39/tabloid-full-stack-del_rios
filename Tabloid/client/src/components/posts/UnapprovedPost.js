
import React, { useState, useContext, useEffect } from "react";
import { Card, CardImg, CardBody, CardFooter, Button, ListGroup, ListGroupItem, Form } from "reactstrap";
import { TagsOnPost } from "../tags/TagsOnPost";
import { PostContext } from "../../providers/PostProvider";

const UnapprovedPost = ({ post }) => {
  const { editPost, getAllUnApprovedPosts } = useContext(PostContext);
  const [postEdit, setEditPost] = useState();

  let formatedDate = null;
  let unformatedDate = null;
  if (post.publishDateTime != null) {
    unformatedDate = post.publishDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }

  useEffect(() => {
    setEditPost(post);
  }, [post]);


  const updatePost = () => {
    postEdit.isApproved = true;
    editPost(postEdit.id, postEdit).then(() => getAllUnApprovedPosts())
  };

  return (
    <Card className="m-4 unapprovedPostImage">
      <p className="text-left px-2"><strong>Posted by: </strong>{post.userProfile.displayName}</p>
      <CardBody>
        <Form>
          <ListGroup >
            <ListGroupItem> <strong>Title: </strong>{post.title}</ListGroupItem>
            {(post.imageLocation != null)
              ? <ListGroupItem> <CardImg top src={post.imageLocation} alt={post.title} /></ListGroupItem>
              : ""}
            <ListGroupItem><strong>Content: </strong>{post.content}</ListGroupItem>
            <ListGroupItem><strong>Category</strong>: {post.category.name}</ListGroupItem>
            {
              (post.publishDateTime == null)
                ? <ListGroupItem><strong>Posted: </strong>No publication date.</ListGroupItem>
                : <ListGroupItem><strong>Posted: </strong>{formatedDate}</ListGroupItem>
            }
            <ListGroupItem><strong>Posted By: </strong>{post.userProfile.displayName}</ListGroupItem>
            <ListGroupItem><div className="postTags"> <strong>Tags: </strong>  {post.postTags.map(pt => <TagsOnPost key={pt.id} postTag={pt} />)}</div></ListGroupItem>
          </ListGroup>
        </Form>
      </CardBody>
      <Button color="info" type="submit" color="success" onClick={updatePost}>Approve</Button>
    </Card>
  );
}

export default UnapprovedPost;