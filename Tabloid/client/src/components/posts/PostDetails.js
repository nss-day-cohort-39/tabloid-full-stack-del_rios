import React, { useEffect, useContext, useState } from "react";
import { Button, CardBody, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader, Modal, ModalHeader, ModalBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { ReactionContext } from "../../providers/ReactionProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useParams, useHistory, Link } from "react-router-dom";
import { TagsOnPost } from "../tags/TagsOnPost";
import { CommentList } from "../comments/CommentList";
import { Reactions } from "./Reactions";
import "../../css/Tag.css"
import "../../css/Reaction.css"

const PostDetails = () => {
  const [post, setPost] = useState();
  const { getPost, deletePostById, editPost } = useContext(PostContext);
  const { getAllCategories, categories } = useContext(CategoryContext)
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const userTypeId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [displayComment, setDisplayComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formState, setformState] = useState({});
  const { getAllReactions, reactions } = useContext(ReactionContext)

  const toggleModal = () => setShowModal(!showModal);
  const toggleToast = () => setShowToast(!showToast);
  const toggleComments = () => setDisplayComment(!displayComment);

  const handleUserInput = (e) => {
    const updatedState = { ...formState }
    updatedState[e.target.id] = e.target.value
    setformState(updatedState)
  }

  const commentDisplay = () => {
    if (displayComment) {
      return (
        <div>
          <CommentList comments={post.comments} setPost={setPost} postId={post.id} />
          {/* {
            post.comments.map(c => <Comment key={c.id} comment={c} setPost={setPost} />)
          } */}
        </div>
      )
    }
  }

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllReactions();
  }, []);

  useEffect(() => {
    setformState(post);
  }, [post]);

  if (!post) {
    return null;
  }

  const deletePost = (e) => {
    e.preventDefault();

    deletePostById(post.id).then((p) => {
      history.push("/");
    });
  };

  const updatePost = (e) => {
    e.preventDefault();

    formState.categoryId = +formState.categoryId;
    editPost(formState.id, formState).then(() => {
      getPost(formState.id).then(setPost).then(toggleModal);
    });
  };

  const formButtonContainer = () => {
    return (
      <div className="buttonContainer">
        <Button color="info" type="submit">
          EDIT POST
        </Button>

        <Button color="warning" onClick={toggleModal}>CANCEL EDIT</Button>{' '}
      </div>
    )
  }

  const buttonContainerRender = () => {
    if (post.userProfileId === userProfileId) {
      return (
        <ListGroupItem className="buttonContainer">
          <Button onClick={toggleModal} color="warning">Edit Post</Button>
          <Button onClick={toggleToast} color="danger">Delete Post</Button>
          <Button onClick={toggleComments} color="primary">{(displayComment) ? "Hide Comments" : "Show Comments"}</Button>
        </ListGroupItem>
      )
    } else {
      return (
        <ListGroupItem className="buttonContainer">
          <Button onClick={toggleToast} color="danger">Delete Post</Button>
          <Button onClick={toggleComments} color="primary">{(displayComment) ? "Hide Comments" : "Show Comments"}</Button>
        </ListGroupItem>
      )
    }
  }

  let formatedDate = null;
  let unformatedDate = null;

  if (post.publishDateTime != null) {
    unformatedDate = post.publishDateTime.split("T")[0];
    const [year, month, day] = unformatedDate.split("-");
    formatedDate = month + "/" + day + "/" + year;
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <ListGroup>
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

            <ListGroupItem><strong>Posted By: </strong><Link to={`/user/${post.userProfileId}`}>{post.userProfile.displayName}</Link></ListGroupItem>
            <ListGroupItem><div className="postTags"> <strong>Tags: </strong>  {post.postTags.map(pt => <TagsOnPost key={pt.id} postTag={pt} />)}</div></ListGroupItem>

            {
              (post.userProfileId === userProfileId || userTypeId === 1)
                ? buttonContainerRender()
                : <ListGroupItem className="buttonContainer"><Button onClick={toggleComments} color="primary">{(displayComment) ? "Hide Comments" : "Show Comments"}</Button></ListGroupItem>
            }

            <ListGroupItem><div className="postReactions">{reactions.map(r => <Reactions key={r.id} reaction={r} />)}</div></ListGroupItem>

            {
              (post.userProfileId === userProfileId)
                ? <ListGroupItem><Link to={`/AddTagForm/post/${post.id}`}><h6>Manage Tags</h6></Link></ListGroupItem>
                : ""
            }

            {
              (post.isApproved === false)
                ? <p>This post has not yet been approved by an admin and is only visible to you.</p>
                : ""
            }

          </ListGroup>
          {commentDisplay()}

          <div className="p-3 my-2 rounded">
            <Toast isOpen={showToast}>
              <ToastHeader className="bg-danger">
                Warning
              </ToastHeader>
              <ToastBody>
                Are you certain that you wish to delete the post: {post.title}
              </ToastBody>
              <div className="buttonContainer">
                <Button onClick={toggleToast} color="primary">No, Cancel</Button><Button onClick={deletePost} color="danger">Yes, Delete Post</Button>
              </div>
            </Toast>
          </div>

          <div>
            <Modal isOpen={showModal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Edit post: {post.title}</ModalHeader>
              <ModalBody>
                <CardBody>
                  <Form onSubmit={updatePost}>
                    <FormGroup>
                      <Label for="imageLocation">Image URL</Label>
                      <Input
                        id="imageLocation"
                        type="url"
                        defaultValue={post.imageLocation}
                        onChange={handleUserInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="title">Title</Label>
                      <Input id="title" defaultValue={post.title} onChange={handleUserInput} required />
                    </FormGroup>
                    <FormGroup>
                      <Label for="content">Content</Label>
                      <Input
                        id="content"
                        defaultValue={post.content}
                        onChange={handleUserInput}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="publishDateTime">Publication Date</Label>
                      <Input
                        id="publishDateTime"
                        type="date"
                        defaultValue={unformatedDate}
                        onChange={handleUserInput}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Category:</Label>
                      <select id="categoryId" defaultValue={(categories.find(c => c.id === post.category.id && c.active)) ? post.category.id : ""} onChange={handleUserInput}>
                        <option key={0} value="">Choose Category</option>
                        {
                          categories.map(c => {
                            return <option key={c.id} value={c.id}>{c.name}</option>
                          })
                        }
                      </select>
                    </FormGroup>
                    {
                      (post.userProfileId === userProfileId)
                        ? formButtonContainer()
                        : ""
                    }
                  </Form>
                </CardBody>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </div >
  );
};

export default PostDetails;


