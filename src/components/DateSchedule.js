import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { parseISO, format } from "date-fns";

import { deleteCounselorSchedule } from "../api/axios";
import { deleteAvailableDates } from "../features/counselorSlice";

function DateSchedule({ onError }) {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const availableDates = useSelector(
    ({ counselor }) => counselor.data.availableDates
  )
    .filter(({ type }) => type === "date")
    .sort((a, b) => {
      if (a.startDate > b.startDate) return 1;
      if (a.startDate < b.startDate) return -1;

      return 0;
    });

  async function handleClickDeleteButton(id) {
    try {
      await deleteCounselorSchedule({ userId, dateId: id });

      dispatch(deleteAvailableDates({ id }));
    } catch (err) {
      onError(err.message);
    }
  }

  return (
    <ScheduleContainer>
      {availableDates.map((date) => {
        const { startDate, endDate, _id } = date;

        return (
          <div className="date-line" key={_id}>
            <span>{format(parseISO(startDate), "yyyy.MM.dd(eee)")}</span>
            <span>
              {format(parseISO(startDate), "HH")}시 ~
              {format(parseISO(endDate), "HH")}시
            </span>
            <button
              id={_id}
              onClick={(e) => handleClickDeleteButton(e.target.id)}
            >
              <Icon icon={"icomoon-free:bin"} style={{ fontSize: "2rem" }} />
            </button>
          </div>
        );
      })}
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.div`
  padding: 20px;
  font-size: 1.5rem;

  .date-line {
    margin: 10px;
  }

  .date-line button {
    width: 43px;
    margin: 0 10px;
    padding: 5px;
    border-radius: 3rem;
    border: none;
    background-color: #ffffff;
    color: ${({ theme }) => theme.colors.btn_bg_1};
    font-weight: bold;
    cursor: pointer;
  }

  span {
    margin: 0 5px;
  }
`;

DateSchedule.propTypes = {
  onError: PropTypes.func.isRequired,
};

export default DateSchedule;
