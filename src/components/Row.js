import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

import { deleteAvailableDates } from "../features/counselorSlice";
import { TYPE_WEEKDAY } from "../constants/date";

const weekDay = ["일", "월", "화", "수", "목", "금", "토"];

function Row({ dayNumber, onError }) {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const availableDates = useSelector(
    ({ counselor }) => counselor.data.availableDates
  ).filter(({ type }) => type === TYPE_WEEKDAY);

  async function handleDelete(e) {
    try {
      const { id } = e.target;

      await axios.delete(
        `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}/counselor/availableDates/${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(deleteAvailableDates({ id }));
    } catch (err) {
      onError(err.message);
    }
  }

  return (
    <WeekDayContainer>
      <div className="day-name">{weekDay[dayNumber]}</div>
      <div>
        {availableDates
          .filter(({ day }) => day === Number(dayNumber))
          .sort((a, b) => a.startHour - b.startHour)
          .map(({ startHour, endHour, _id }) => {
            return (
              <div key={_id}>
                <span>
                  {startHour}시 ~ {endHour}시
                </span>
                <span className="delete" id={_id} onClick={handleDelete}>
                  Delete
                </span>
              </div>
            );
          })}
      </div>
    </WeekDayContainer>
  );
}

const WeekDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 2rem;
  background-color: blanchedalmond;
  font-size: 1.7rem;

  .day-name {
    flex-basis: 15%;
  }
`;

Row.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  onError: PropTypes.func.isRequired,
};

export default Row;
