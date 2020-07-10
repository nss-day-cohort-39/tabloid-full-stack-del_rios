import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CategoryProvider } from "./providers/CategoryProvider"
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { TagProvider } from './providers/TagProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <CategoryProvider>
          <PostProvider>
            <TagProvider>
              <Header />
              <ApplicationViews />
            </TagProvider>
          </PostProvider>
        </CategoryProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
