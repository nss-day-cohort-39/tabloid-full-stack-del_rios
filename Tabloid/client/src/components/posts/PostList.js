import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import {SearchBar} from "./PostSearchBar"
import {SearchResults} from "./PostSearchResults"


const PostList = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const [searchTerms, setTerms] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="postList">
      <SearchBar setTerms={setTerms} />
        <SearchResults searchTerms={searchTerms} />
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;