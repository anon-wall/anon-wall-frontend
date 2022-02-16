import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "./common/Modal";

function PrivateRoute() {
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);
  const navigate = useNavigate();

  function handleClickGoHomeButton() {
    navigate("/");
  }

  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Modal width="50rem" height="20rem">
          <div>로그인이 필요합니다.</div>
          <button onClick={handleClickGoHomeButton}>홈으로</button>
        </Modal>
      )}
    </>
  );
}

export default PrivateRoute;
