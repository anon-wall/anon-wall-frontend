import styled from "styled-components";

import SubHeader from "./common/SubHeader";

export default function StoryDetail() {
  return (
    <>
      <SubHeader
        heading="고민 담벼락"
        paragraph="나누고 싶은 고민을 자유롭게 올려주세요. 여러분의 고민을 들어줄 익명의 누군가가 곧 찾아올거에요."
      />
      <MainContainer>
        <section>
          <StoryHeaderWrapper>
            <ImageWrapper>
              <img />
            </ImageWrapper>
            <StoryInfoWrapper>
              <div className="name">켄 아버지</div>
              <div className="title">요즘 힘들어요</div>
              <div className="tags">#소통 #코딩 #바닐라코딩</div>
            </StoryInfoWrapper>
          </StoryHeaderWrapper>
          <StoryBodyWrapper>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Inventore sapiente nobis consectetur. Quidem quasi repellat vitae
              molestiae, quia ratione sequi praesentium veritatis amet
              architecto aliquam libero maxime in iste. Dolore!
            </p>
          </StoryBodyWrapper>
        </section>
        <aside>
          <AsideWrapper>
            <ButtonWrapper>
              <button>사연 수락하기</button>
            </ButtonWrapper>
          </AsideWrapper>
        </aside>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 100vh;
  margin: 0 auto;

  section {
    flex-basis: 70%;
    height: 100%;
  }

  aside {
    flex-basis: 30%;
    height: 100%;
  }
`;

const StoryHeaderWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 20%;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 100%;
  background-color: #000000;

  img {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background-color: #ffffff;
  }
`;

const StoryInfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 2.5rem;
  text-align: center;
  line-height: 6rem;

  .name {
    font-size: 3rem;
    color: #3e005b;
  }
`;

const StoryBodyWrapper = styled.div`
  width: 90%;
  height: 70%;
  padding: 5rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
  font-size: 2.5rem;
  overflow-y: auto;
`;

const AsideWrapper = styled.div`
  width: 90%;
  height: 92.5%;
  min-height: 92.5%;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  button {
    font-size: 3.5rem;
    padding: 1rem;
    border-radius: 3rem;
  }
`;
