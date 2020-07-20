import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import UnapprovedPost from "./UnapprovedPost";


const UnapprovedPostList = () => {
  const { posts, getAllUnApprovedPosts } = useContext(PostContext);

  useEffect(() => {
    getAllUnApprovedPosts();
  }, []);

  return (
    <div className="row justify-content-center">
      <header><h1>Pending Posts</h1></header>
      <div className="postList">
        <div className="cards-column">
          {posts.map((post) => (
            <UnapprovedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnapprovedPostList;