import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { parseISO, format } from "date-fns";
import styled from "styled-components";

import { deleteAvailableDates } from "../features/counselorSlice";

function DateSchedule({ onError }) {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const scheduleList = useSelector(
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
    <ScheduleContainer>
      {scheduleList.map((date) => {
        const { startDate, endDate, _id } = date;

        return (
          <div key={_id}>
            <span>{format(parseISO(startDate), "yyyy.MM.dd(eee)")}</span>
            <span>
              {format(parseISO(startDate), "HH")}시 ~
              {format(parseISO(endDate), "HH")}시
            </span>
            <button
              id={_id}
              onClick={(e) => handleClickDeleteButton(e.target.id)}
            >
              삭제
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
`;

DateSchedule.propTypes = {
  onError: PropTypes.func.isRequired,
};

export default DateSchedule;
