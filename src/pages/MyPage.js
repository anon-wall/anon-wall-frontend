import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "../components/SideBar";

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/mypage/main");
  }, []);

  return (
    <MyPageContainer>
      <Sidebar />
      <Outlet />
    </MyPageContainer>
  );
}

const MyPageContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 100%;
  margin: 0 auto;
`;

export default MyPage;
