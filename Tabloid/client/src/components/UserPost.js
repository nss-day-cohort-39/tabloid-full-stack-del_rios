import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";


const UserPost = () => {
  const { posts, getUserPost } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    getUserPost(id);
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="postList">
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPost;