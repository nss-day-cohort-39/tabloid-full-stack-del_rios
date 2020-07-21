import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const apiUrl = "/api/post";
  const { getToken } = useContext(UserProfileContext);


  const getAllPosts = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then(setPosts));

        const getAllUnApprovedPosts = () =>
    getToken().then((token) =>
      fetch("/api/post/unapproved", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json())
        .then(setPosts));

  const addPost = (post) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }));

  const addTagtoPost = (postTag) =>
    getToken().then((token) =>
      fetch(`/api/post/addtag`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        else { throw new Error("Unauthorized"); }
      }));

  const removeTagFromPost = (id) => {
    return getToken().then((token) =>
      fetch(`/api/post/addtag/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        else { throw new Error("Failed to delete post.") }
      })
    );
  };

  const getPost = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        else { throw new Error("Unauthorized"); }
      }));
  }

  const getUserPost = (id) => {
    getToken().then((token) =>
      fetch(apiUrl + `/getbyuser/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(resp => {
        if (resp.ok) {
          return resp.json().then(setPosts);
        }
        throw new Error("Unauthorized");
      }))
  };

  const deletePostById = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Failed to delete post.")
      })
    );
  };

  const editPost = (id, post) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).then(resp => {
        if (resp.ok) {
          return;
        }
        throw new Error("Unauthorized");
      }))
  };
  // Functions for post reactions here
  const addReactiontoPost = (postReaction) =>
    getToken().then((token) =>
      fetch(`/api/post/react`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postReaction),
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        else { throw new Error("Unauthorized"); }
      }));

  const removeReactionFromPost = (id) => {
    return getToken().then((token) =>
      fetch(`/api/post/deletereaction/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        else { throw new Error("Failed to delete post.") }
      })
    );
  };

  
  const searchPosts = (search) => {
    return fetch(`api/post/search?q=${search}`)
  .then(res => res.json())
  .then(setPosts)
  };

  return (
    <PostContext.Provider value={{searchPosts, posts, getAllPosts, addPost, addTagtoPost, removeTagFromPost, getPost, getUserPost, deletePostById, editPost, addReactiontoPost, removeReactionFromPost, getAllUnApprovedPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};