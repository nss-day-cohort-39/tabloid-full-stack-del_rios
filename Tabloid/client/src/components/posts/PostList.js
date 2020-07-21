import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Label } from "reactstrap";
import Post from "./Post";
import { SearchBar } from "./PostSearchBar"
import { SearchResults } from "./PostSearchResults"

const PostList = () => {
  const { posts, getAllPosts, filterPostsByCategory } = useContext(PostContext);
  const { getAllCategories, categories } = useContext(CategoryContext);
  const [searchTerms, setTerms] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryChange = (e) => {
    e.preventDefault();

    const criterion = +e.target.value
    const approved = true
    filterPostsByCategory(criterion, approved);
  };

  return (
    <div className="row justify-content-center">
      <div className="postList">
        <div className="filterContainer">
          <Label for="content">Filter by Category</Label>
          <select required onChange={handleCategoryChange}>
            <option key={0} value="0"> Choose Category</option>
            {
              categories.map(c => {
                return <option key={c.id} value={c.id}>{c.name}</option>
              })
            }
          </select>
        </div>
        <SearchBar setTerms={setTerms} />
        <SearchResults searchTerms={searchTerms} />
        <div className="cards-column">
          {
            (posts.length > 0)
              ? posts.map((post) => (
                <Post key={post.id} post={post} />
              ))
              : <div><p>No posts matched your criteria.</p></div>
          }
        </div>
      </div>
    </div>
  );
};

export default PostList;