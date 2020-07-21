import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider"

export const SearchResults = ({ searchTerms }) => {
  const { posts } = useContext(PostContext);
  const [filteredPost, setFiltered] = useState([]);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = posts.filter((post) =>
        post.postTags.some(pt => pt.tag.name.toLowerCase().includes(searchTerms))
      );
      setFiltered(subset);
    } else {
      setFiltered([]);
    }
  }, [searchTerms, posts]);

  return (
    <div className="searchResults">
      <div className="searchList">
        {filteredPost.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}><strong>  {post.title}</strong></Link>
        ))}
      </div>
    </div>
  );
};