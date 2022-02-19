import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { parseISO, format } from "date-fns";

function ReservationListEntry({ counsel, type }) {
  const navigate = useNavigate();

  const { counselee, counselor, startDate, _id, title } = counsel;
  const counterpart =
    type === "counselee" ? counselor.nickname : counselee.nickname;

  function handleClick() {
    navigate(`/counsels/${_id}/room`);
  }

  return (
    <ReservationWrapper key={_id}>
      <InfoWrapper>
        <div className="info">
          <div>
            <span className="head">상대방: </span>
            <span>{counterpart}</span>
          </div>
          <div>
            <span className="head">제목: </span>
            <span>{title}</span>
          </div>
          <span className="head">날짜:</span>
          <div>{format(parseISO(startDate), "yyyy-MM-dd aa HH:mm")}</div>
        </div>
      </InfoWrapper>
      <ButtonWrapper>
        <button
          onClick={handleClick}
          disabled={new Date(startDate).getTime() > new Date().getTime()}
        >
          입장하기
        </button>
      </ButtonWrapper>
    </ReservationWrapper>
  );
}

const ReservationWrapper = styled.div`
  width: 28rem;
  min-height: 27.5rem;
  padding: 1rem;
  text-align: center;
  line-height: 3rem;
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 80%;
  background-color: #dedfac;
  border-radius: 30%;

  .head {
    font-weight: 800;
  }

  .info {
    padding: 4rem 0 0 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonWrapper = styled.div`
  height: 20%;
  margin-top: 1rem;
  text-align: center;

  button {
    padding: 0.5rem 1rem;
    border: 0.1px solid black;
    border-radius: 1.5rem;
    background-color: #95bcf0;
    color: #ffffff;
    font-size: ${({ theme }) => theme.fontSizes.l};
    cursor: pointer;
  }

  button:disabled {
    background-color: #f3f3f3;
    color: #ccc;
    border: none;
    cursor: not-allowed;
  }
`;

ReservationListEntry.propTypes = {
  counsel: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ReservationListEntry;
