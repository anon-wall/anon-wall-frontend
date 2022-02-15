import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

import { deleteAvailableDates } from "../features/counselorSlice";
import { TYPE_WEEKDAY, WEEK_DAYS } from "../constants/date";

function DaySchedule({ dayNumber, onError }) {
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
      <div className="day-name">{WEEK_DAYS[dayNumber]}</div>
      <div>
        {availableDates
          .filter(({ day }) => day === Number(dayNumber))
          .sort((a, b) => a.startHour - b.startHour)
          .map(({ startHour, endHour, _id }) => {
            return (
              <div key={_id} className="time-line">
                <span>
                  {startHour}시 ~ {endHour}시
                </span>
                <button className="delete" id={_id} onClick={handleDelete}>
                  Delete
                </button>
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
  font-size: 1.5rem;
  border-top: 1px solid grey;

  .day-name {
    flex-basis: 15%;
    font-size: 1.7rem;
  }

  .time-line {
    overflow: scroll;
  }
`;

DaySchedule.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  onError: PropTypes.func.isRequired,
};

export default DaySchedule;
