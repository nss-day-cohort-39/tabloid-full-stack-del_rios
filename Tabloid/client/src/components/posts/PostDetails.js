import React, { useEffect, useContext, useState } from "react";
import { Button, CardBody, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader, Modal, ModalHeader, ModalBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useParams, useHistory, Link } from "react-router-dom";
import { TagsOnPost } from "../tags/TagsOnPost";
import { CommentList } from "../comments/CommentList";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { getPost, deletePostById, editPost, addTag } = useContext(PostContext);
  const { getAllCategories, categories } = useContext(CategoryContext)
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [displayComment, setDisplayComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formState, setformState] = useState({});

  const toggleModal = () => setShowModal(!showModal);
  const toggleToast = () => setShowToast(!showToast);
  const toggleComments = () => setDisplayComment(!displayComment);

  const handleUserInput = (e) => {
    const updatedState = { ...formState }
    updatedState[e.target.id] = e.target.value
    setformState(updatedState)
  }

  const commentDisplay = () => {
    if (displayComment && post.comments.length > 0) {
      return (
        <div>
          <CommentList comments={post.comments} setPost={setPost} postId={post.id} />
          {/* {
            post.comments.map(c => <Comment key={c.id} comment={c} setPost={setPost} />)
          } */}
        </div>
      )
    }
    else if (displayComment && post.comments.length === 0) {
      return (
        <div><h1>AINT NUTTIN HERE BITCH!!!!!!</h1></div>
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

  const unformatedDate = post.publishDateTime.split("T")[0];
  const [year, month, day] = unformatedDate.split("-");
  const formatedDate = month + "/" + day + "/" + year;


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <ListGroup>
            <ListGroupItem> <strong>Title: </strong>{post.title}</ListGroupItem>
            <ListGroupItem> <CardImg top src={post.imageLocation} alt={post.title} /></ListGroupItem>
            <ListGroupItem>{post.content}</ListGroupItem>
            <ListGroupItem><strong>Category</strong>: {post.category.name}</ListGroupItem>
            <ListGroupItem><strong>Posted: </strong>{formatedDate}</ListGroupItem>
            <ListGroupItem><strong>Posted By: </strong>{post.userProfile.displayName}</ListGroupItem>
            <ListGroupItem><div className="postTags"> <strong>Tags: </strong>  {post.postTags.map(pt => <TagsOnPost key={pt.id} postTag={pt} />)}</div></ListGroupItem>

            {
              (post.userProfileId === userProfileId)
                ? <ListGroupItem className="buttonContainer"><Button onClick={toggleModal} color="warning">Edit Post</Button><Button onClick={toggleComments} color="primary">{(displayComment) ? "Hide Comments" : "Show Comments"}</Button><Button onClick={toggleToast} color="danger">Delete Post</Button></ListGroupItem>
                : <Button onClick={toggleComments} color="primary">{(displayComment) ? "Hide Comments" : "Show Comments"}</Button>
            }

            {
              (post.userProfileId === userProfileId)
                ? <ListGroupItem><Link to={`/AddTagForm/post/${post.id}`}><h6>Manage Tags</h6></Link></ListGroupItem>
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
                      <select id="categoryId" defaultValue={post.category.id} onChange={handleUserInput}>
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


