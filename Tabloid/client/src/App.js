import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CategoryProvider } from "./providers/CategoryProvider"
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { TagProvider } from './providers/TagProvider';
import { CommentProvider } from './providers/CommentProvider';
import { ReactionProvider } from './providers/ReactionProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <CategoryProvider>
          <PostProvider>
            <TagProvider>
              <CommentProvider>
                <ReactionProvider>
                  <Header />
                  <ApplicationViews />
                </ReactionProvider>
              </CommentProvider>
            </TagProvider>
          </PostProvider>
        </CategoryProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
