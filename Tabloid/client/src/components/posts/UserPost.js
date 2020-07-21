import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const UserPost = () => {
  const { posts, getUserPost } = useContext(PostContext);
  const { getUserProfileById } = useContext(UserProfileContext);
  const [userProfile, setUserProfile] = useState();
  const { id } = useParams();

  useEffect(() => {
    getUserProfileById(id).then(setUserProfile);
  }, []);

  useEffect(() => {
    getUserPost(id);
  }, [id]);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="row justify-content-center">
      <div className="postList">
        <h2>{userProfile.displayName}'s Posts</h2>
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