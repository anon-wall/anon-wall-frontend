import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { TYPE_WEEKDAY, EXISTED_TIMELINE_WARNING } from "../constants/date";
import {
  updateAvailableDates,
  deleteAvailableDates,
} from "../features/counselorSlice";

function WeekDayScheduler() {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const availableDates = useSelector(
    ({ counselor }) => counselor.data.availableDates
  ).filter(({ type }) => type === TYPE_WEEKDAY);

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedWDays, setSelectedWDays] = useState([]);
  const [startHour, setstartHour] = useState(0);
  const [endHour, setEndHour] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const sameDays = availableDates.filter(
      ({ day }) => day === Number(selectedDay)
    );

    setSelectedWDays(sameDays);
  }, [selectedDay]);

  function handlestartHourChange(e) {
    const { value } = e.target;

    if (value === "") {
      setstartHour("");
      return;
    }

    if (value <= 0) {
      setstartHour(0);
      return;
    }
    if (value >= 23) {
      setstartHour(23);
      return;
    }

    if (value >= endHour) {
      setstartHour(parseInt(value));
      setEndHour(parseInt(value) + 1);
      return;
    }

    setstartHour(parseInt(value));
  }

  function handleEndHourChange(e) {
    const { value } = e.target;

    if (value === "") {
      setEndHour("");
      return;
    }

    if (value <= 1) {
      setEndHour(1);
      return;
    }
    if (value >= 24) {
      setEndHour(24);
      return;
    }

    if (value <= startHour) {
      setEndHour(startHour + 1);
      return;
    }

    setEndHour(parseInt(value));
  }

  async function handleAdd() {
    try {
      if (!setSelectedWDays.length) {
        return;
      }
      for (const exisiting of selectedWDays) {
        if (startHour < exisiting.startHour && endHour > exisiting.startHour) {
          setErrorMessage(EXISTED_TIMELINE_WARNING);
          return;
        }

        if (
          startHour >= exisiting.startHour &&
          startHour <= exisiting.endHour
        ) {
          setErrorMessage(EXISTED_TIMELINE_WARNING);
          return;
        }
      }

      dispatch(
        updateAvailableDates({
          userId,
          availableDates: {
            type: TYPE_WEEKDAY,
            day: selectedDay,
            startHour,
            endHour,
          },
        })
      );
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

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
      setErrorMessage(err.message);
    }
  }

  return (
    <Container>
      <div className="input-fields">
        <select name="day" onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="0">일</option>
          <option value="1">월</option>
          <option value="2">화</option>
          <option value="3">수</option>
          <option value="4">목</option>
          <option value="5">금</option>
          <option value="6">토</option>
        </select>
        <div>
          <input
            className="input"
            onChange={handlestartHourChange}
            value={startHour}
          />
          <input
            className="input"
            onChange={handleEndHourChange}
            value={endHour}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <WeekDayContainer>
        <div className="day-name">일</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 0)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <>
                  <div key={_id}>
                    {startHour}시 ~ {endHour}시
                    <span className="delete" id={_id} onClick={handleDelete}>
                      Delete
                    </span>
                  </div>
                </>
              );
            })}
        </div>
      </WeekDayContainer>
      <WeekDayContainer>
        <div className="day-name">월</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 1)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <div key={_id}>
                  {startHour}시 ~ {endHour}시
                  <span className="delete" id={_id} onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              );
            })}
        </div>
      </WeekDayContainer>
      <WeekDayContainer>
        <div className="day-name">화</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 2)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <div key={_id}>
                  {startHour}시 ~ {endHour}시
                  <span className="delete" id={_id} onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              );
            })}
        </div>
      </WeekDayContainer>
      <WeekDayContainer>
        <div className="day-name">수</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 3)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <div key={_id}>
                  {startHour}시 ~ {endHour}시
                  <span className="delete" id={_id} onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              );
            })}
        </div>
      </WeekDayContainer>
      <WeekDayContainer>
        <div className="day-name">목</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 4)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <div key={_id}>
                  {startHour}시 ~ {endHour}시
                  <span className="delete" id={_id} onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              );
            })}
        </div>
      </WeekDayContainer>
      <WeekDayContainer>
        <div className="day-name">금</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 5)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <div key={_id}>
                  {startHour}시 ~ {endHour}시
                  <span className="delete" id={_id} onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              );
            })}
        </div>
      </WeekDayContainer>
      <WeekDayContainer>
        <div className="day-name">토</div>
        <div>
          {availableDates
            .filter(({ day }) => day === 6)
            .sort((a, b) => a.startHour - b.startHour)
            .map(({ startHour, endHour, _id }) => {
              return (
                <div key={_id}>
                  {startHour}시 ~ {endHour}시
                  <span className="delete" id={_id} onClick={handleDelete}>
                    Delete
                  </span>
                </div>
              );
            })}
        </div>
      </WeekDayContainer>
    </Container>
  );
}

const Container = styled.div`
  .input {
    height: 3rem;
  }

  .input-fields {
    padding: 3rem;
    display: flex;
    flex-direction: column;
  }

  .delete {
    padding-left: 3rem;
    cursor: pointer;
  }

  .error-message {
    color: red;
    font-size: 2rem;
  }
`;

const WeekDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  padding: 2rem;
  background-color: blanchedalmond;
  font-size: 1.7rem;

  .day-name {
    flex-basis: 15%;
  }
`;

export default WeekDayScheduler;
