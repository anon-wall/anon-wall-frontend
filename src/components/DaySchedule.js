import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { deleteCounselorSchedule } from "../api/axios";
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

      await deleteCounselorSchedule({ userId, dateId: id });

      dispatch(deleteAvailableDates({ id }));
    } catch (err) {
      onError(err.message);
    }
  }

  return (
    <WeekDayContainer>
      <div className="day-name">{WEEK_DAYS[dayNumber]}</div>
      <div className="time-line-container">
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
                  삭제
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
  justify-content: space-between;
  width: 90%;
  padding: 2rem;
  font-size: 1.5rem;
  border-top: 1px solid grey;

  .day-name {
    flex-basis: 15%;
    font-size: 1.7rem;
  }

  .time-line-container {
    width: 100%;
  }

  .time-line {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
  }

  .delete {
    width: 43px;
    margin: 0 10px;
    padding: 5px;
    background-color: #95bcf0;
    border-radius: 3rem;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

DaySchedule.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  onError: PropTypes.func.isRequired,
};

export default DaySchedule;
