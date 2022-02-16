import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
import PrivateRoute from "./components/PrivateRoute";
import Modal from "./components/common/Modal";
import UserStoryList from "./pages/UserStoryList";
import { getCookie } from "./api/cookie";
import { getLoginUserByToken } from "./features/userSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn && getCookie("accessToken")) {
      dispatch(getLoginUserByToken(setErrorMessage));
    }
  }, []);

  function handleClickGoHomeButton() {
    navigate("/");
  }

  return (
    <div>
      {errorMessage && (
        <Modal width="50rem" height="20rem">
          <div>{errorMessage}</div>
          <button onClick={handleClickGoHomeButton}>홈으로</button>
        </Modal>
      )}
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counsels" element={<StoryList />} />
          <Route element={<PrivateRoute />}>
            <Route path="/counsels/:counsel_id" element={<StoryDetail />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route
              path="/counsels/:counsel_id/counselors/:user_id"
              element={<CounselorDetail />}
            />
          </Route>
          <Route path="/counsels/:counsel_id/room" element={<ChatRoom />} />
          <Route path="/counsels/new" element={<UploadStory />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mypage" element={<MyPage />}>
              <Route element={<PrivateRoute />}>
                <Route path="/mypage/main" element={<MyPageMain />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/mypage/counselor" element={<MyPageCounselor />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/mypage/stories" element={<UserStoryList />} />
              </Route>
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
