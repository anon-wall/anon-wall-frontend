import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
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
      const { id } = e.currentTarget;

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
                <span className="time">
                  {startHour}시 ~ {endHour}시
                </span>
                <button className="delete" id={_id} onClick={handleDelete}>
                  <Icon
                    icon={"icomoon-free:bin"}
                    style={{ fontSize: "2rem" }}
                  />
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
    font-weight: 700;
  }

  .time-line-container {
    width: 100%;
  }

  .time-line {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .time {
    width: 70%;
    font-size: ${({ theme }) => theme.fontSizes.mmmm};
    text-align: center;
    line-height: 2;
  }

  .delete {
    padding: 5px;
    background-color: #ffffff;
    border-radius: 3rem;
    border: none;
    color: ${({ theme }) => theme.colors.btn_bg_1};
    font-weight: bold;
    cursor: pointer;
  }
`;

DaySchedule.propTypes = {
  dayNumber: PropTypes.number.isRequired,
  onError: PropTypes.func.isRequired,
};

export default DaySchedule;
