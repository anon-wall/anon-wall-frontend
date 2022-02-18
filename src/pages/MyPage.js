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
    <PageContainer>
      <MyPageContainer>
        <Sidebar />
        <Outlet />
      </MyPageContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  border-top: 3px solid black;
`;

const MyPageContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 95%;
  max-width: 155rem;
  height: 100%;
  margin: 0 auto;
  font-family: "GangwonEdu_OTFBoldA";
`;

export default MyPage;
