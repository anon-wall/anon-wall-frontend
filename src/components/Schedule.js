import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Modal from "./common/Modal";
import { makeLocalTime, makeLocalDate } from "../utils/time";
import { deleteAvailableDates } from "../features/counselorSlice";

function Schedule() {
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

  const [modalMessage, setModalMessage] = useState("");

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
      setModalMessage(err.message);
    }
  }

  return (
    <>
      {modalMessage && (
        <Modal onClick={setModalMessage} width="50rem" height="20rem">
          {modalMessage}
        </Modal>
      )}
      {scheduleList.map((date) => {
        const { startDate, endDate, _id } = date;

        return (
          <div key={_id}>
            <span>{makeLocalDate(startDate)}</span>
            <span>
              {makeLocalTime(startDate)}시~{makeLocalTime(endDate)}시
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
    </>
  );
}

export default Schedule;
