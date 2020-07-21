import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Label } from "reactstrap";
import UnapprovedPost from "./UnapprovedPost";


const UnapprovedPostList = () => {
  const { posts, getAllUnApprovedPosts, filterPostsByCategory } = useContext(PostContext);
  const { getAllCategories, categories } = useContext(CategoryContext);

  useEffect(() => {
    getAllUnApprovedPosts();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryChange = (e) => {
    e.preventDefault();

    const criterion = +e.target.value
    const approved = false
    filterPostsByCategory(criterion, approved);
  };

  return (
    <div className="row justify-content-center">
      <div className="postList">
        <header className="pendingHeader"><h1>Pending Posts</h1></header>
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
        <div className="cards-column">
          {
            (posts.length > 0)
              ? posts.map((post) => (
                <UnapprovedPost key={post.id} post={post} />
              ))
              : <div><p>No posts matched your criteria.</p></div>
          }
        </div>
      </div>
    </div>
  );
};

export default UnapprovedPostList;