import React from "react";
import { Routes, Route } from "react-router-dom";

import MainHeader from "./components/MainHeader";
import Home from "./components/Home";
import StoryDetail from "./components/StroyDetail";

export default function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counsels">
            <Route path=":counsel_id" element={<StoryDetail />} />
            <Route path=":counsel_id/*" />
            <Route path=":counsel_id/counselors/:user_id" />
            <Route path=":counsel_id/room" />
          </Route>
          <Route path="/counsels/new" />
          <Route path="/mypage">
            <Route path="/mypage/counselor" />
            <Route path="/mypage/stories" />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
