import React from "react";
import { Routes, Route } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import StoryList from "./pages/StoryList";
import StoryDetail from "./pages/StoryDetail";
import StoryDetail from "./components/StroyDetail";
import CounselorDetail from "./components/CounselorDetail";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counsels" element={<StoryList />} />
          <Route path="/counsels/:counsel_id" element={<StoryDetail />} />
          <Route
            path="/counsels/:counsel_id/counselors/:user_id"
            element={<CounselorDetail />}
          />
          <Route path="/counsels/:counsel_id/room" />
          <Route path="/counsels/new" />
          <Route path="/mypage">
            <Route path="/mypage/counselor" />
            <Route path="/mypage/stories" />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
