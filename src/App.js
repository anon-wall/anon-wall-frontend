import React from "react";
import { Routes, Route } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import Home from "./pages/Home";
import StoryList from "./pages/StoryList";
import StoryDetail from "./pages/StoryDetail";
import UploadStory from "./pages/UploadStory";
import CounselorDetail from "./components/CounselorDetail";
import MyPageMain from "./pages/MyPageMain";
import MyPageCounselor from "./pages/MyPageCounselor";
import ChatRoom from "./components/ChatRoom";
import NotFound from "./components/NotFound";
import MyPage from "./pages/MyPage";
import UserStoryList from "./pages/UserStoryList";

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
          <Route path="/counsels/:counsel_id/room" element={<ChatRoom />} />
          <Route path="/counsels/new" element={<UploadStory />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route path="/mypage/main" element={<MyPageMain />} />
            <Route path="/mypage/counselor" element={<MyPageCounselor />} />
            <Route path="/mypage/stories" element={<UserStoryList />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
