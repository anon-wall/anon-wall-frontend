import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Row from "./Row";
import Modal from "./common/Modal";
import { TYPE_WEEKDAY, EXISTED_TIMELINE_WARNING } from "../constants/date";
import { updateAvailableDates } from "../features/counselorSlice";

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

  function handleErrorMessage(error) {
    setErrorMessage(error);
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
          <button onClick={handleAdd}>저장하기</button>
        </div>
      </div>

      {Array.from(Array(7).keys()).map((day) => (
        <Row key={day} dayNumber={day} onError={handleErrorMessage} />
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
    width: 340px;
    height: 40px;
  }

  .input-fields input {
    width: 140px;
    height: 30px;
  }

  .input-fields button {
    width: 60px;
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
