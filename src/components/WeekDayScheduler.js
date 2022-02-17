import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import DaySchedule from "./DaySchedule";
import Modal from "./common/Modal";
import { TYPE_WEEKDAY, EXISTED_TIMELINE, WEEK_DAYS } from "../constants/date";
import { updateAvailableDates } from "../features/counselorSlice";

function WeekDayScheduler() {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const availableDates = useSelector(
    ({ counselor }) => counselor.data.availableDates
  ).filter(({ type }) => type === TYPE_WEEKDAY);

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedWDays, setSelectedWDays] = useState([]);
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const sameDays = availableDates.filter(
      ({ day }) => day === Number(selectedDay)
    );

    setSelectedWDays(sameDays);
  }, [selectedDay, availableDates.length]);

  function handleStartHourChange(e) {
    const { value } = e.target;

    if (value === "") {
      setStartHour("");
      return;
    }

    if (value <= 0) {
      setStartHour(0);
      return;
    }
    if (value >= 23) {
      setStartHour(23);
      return;
    }

    if (value >= endHour) {
      setStartHour(parseInt(value));
      setEndHour(parseInt(value) + 1);
      return;
    }

    setStartHour(parseInt(value));
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

      for (const existing of selectedWDays) {
        if (startHour < existing.startHour && endHour > existing.startHour) {
          setErrorMessage(EXISTED_TIMELINE);
          return;
        }

        if (startHour >= existing.startHour && startHour < existing.endHour) {
          setErrorMessage(EXISTED_TIMELINE);
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

  return (
    <Container>
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          {errorMessage}
        </Modal>
      )}
      <div className="input-fields">
        <select name="day" onChange={(e) => setSelectedDay(e.target.value)}>
          {WEEK_DAYS.map((day, i) => (
            <option key={i} value={i}>
              {day}
            </option>
          ))}
        </select>
        <div>
          <input
            className="input"
            onChange={handleStartHourChange}
            value={startHour}
          />
          <input
            className="input"
            onChange={handleEndHourChange}
            value={endHour}
          />
          <button onClick={handleAdd}>저장하기</button>
        </div>
      </div>

      {Array.from(Array(7).keys()).map((day) => (
        <DaySchedule key={day} dayNumber={day} onError={setErrorMessage} />
      ))}
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
    align-items: center;
  }
  .input-fields select {
    width: 28rem;
    height: 40px;
  }

  .input-fields input {
    width: 11rem;
    height: 30px;
  }

  .input-fields button {
    width: 6rem;
    height: 30px;
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

export default WeekDayScheduler;
