import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import PostDetails from "./posts/PostDetails"
import UserPost from "./posts/UserPost"
import Login from "./auth/Login";
import Register from "./auth/Register";
import PostList from "./posts/PostList";
import UnapprovedPostList from "./posts/UnapprovedPostList"
import { TagList } from "./tags/TagList";
import { PostForm } from "./posts/PostForm";
import { CategoryList } from "./categories/CategoryList"
import { UserProfileList } from "./userProfile/UserProfileList";
import { AddTagForm } from "./tags/AddTagForm";
import { UserProfileDetails } from "./userProfile/UserProfileDetails";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/user/:id">
          {isLoggedIn ? <UserPost /> : <Redirect to="/login" />}
        </Route>

        <Route path="/addpost">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofiles" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/addTagForm/post/:id">
          {isLoggedIn ? <AddTagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofiles/:id">
          {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
        </Route>

        
        <Route path="/unapproved">
          {isLoggedIn ? <UnapprovedPostList /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </main>
  );
};
