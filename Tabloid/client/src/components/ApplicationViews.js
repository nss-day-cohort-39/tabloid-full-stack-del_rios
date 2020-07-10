import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import PostDetails from "./PostDetails"
import UserPost from "./UserPost"
import Login from "./Login";
import Register from "./Register";
import PostList from "./PostList";
import { PostForm } from "./PostForm";
import { CategoryList } from "./categories/CategoryList"

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

      </Switch>
    </main>
  );
};
