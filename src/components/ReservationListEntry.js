import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

function ReservationListEntry({ counsel, type }) {
  const navigate = useNavigate();

  const { counselee, counselor, startDate, _id } = counsel;
  const counterpart =
    type === "counselor" ? counselee.nickname : counselor.nickname;

  function handleClick() {
    navigate(`/counsels/${_id}/room`);
  }

  return (
    <ReservationWrapper key={_id}>
      <InfoWrapper>
        <div className="info">
          <span>상대방: </span>
          <div>{counterpart}</div>
          <span>날짜:</span>
          <div>{new Date(startDate).toLocaleString()}</div>
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
  width: 25rem;
  min-height: 27.5rem;
  padding: 1rem;
  text-align: center;
  line-height: 3rem;
`;

const InfoWrapper = styled.div`
  background-color: #dedfac;
  width: 100%;
  height: 80%;
  border-radius: 30%;

  span {
    font-weight: 800;
  }

  .info {
    padding-top: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  height: 20%;
  margin-top: 1rem;

  button {
    width: 7rem;
    height: 4rem;
    margin: 0 10px;
    padding: 5px;
    background-color: #a79286;
    border-radius: 3rem;
    border: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

ReservationListEntry.propTypes = {
  counsel: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ReservationListEntry;
