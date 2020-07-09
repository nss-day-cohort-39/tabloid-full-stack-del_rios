import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../Providers/PostProvider";
import Post from "./Post";


const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);

 useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="postList">
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;