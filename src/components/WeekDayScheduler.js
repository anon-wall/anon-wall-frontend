import styled from "styled-components";

function WeekDayScheduler() {
  return (
    <Container>
      <div>
        <select name="day">
          <option value="1">월</option>
          <option value="2">화</option>
          <option value="3">수</option>
          <option value="4">목</option>
          <option value="5">금</option>
          <option value="6">토</option>
          <option value="0">일</option>
        </select>
        <input className="input"></input>
        <input className="input"></input>
      </div>
      <WeekDayContainer>
        <WeekDayWrapper>일</WeekDayWrapper>
      </WeekDayContainer>
      <WeekDayContainer>
        <WeekDayWrapper>월</WeekDayWrapper>
      </WeekDayContainer>
      <WeekDayContainer>
        <WeekDayWrapper>화</WeekDayWrapper>
      </WeekDayContainer>
      <WeekDayContainer>
        <WeekDayWrapper>수</WeekDayWrapper>
      </WeekDayContainer>
      <WeekDayContainer>
        <WeekDayWrapper>목</WeekDayWrapper>
      </WeekDayContainer>
      <WeekDayContainer>
        <WeekDayWrapper>금</WeekDayWrapper>
      </WeekDayContainer>
      <WeekDayContainer>
        <WeekDayWrapper>토</WeekDayWrapper>
      </WeekDayContainer>
    </Container>
  );
}

export default WeekDayScheduler;

const Container = styled.div`
  .input {
    height: 3rem;
  }
`;

const WeekDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  padding: 2rem;
  background-color: blanchedalmond;
  font-size: 3rem;
`;

const WeekDayWrapper = styled.div`
  flex-basis: 15%;
`;
