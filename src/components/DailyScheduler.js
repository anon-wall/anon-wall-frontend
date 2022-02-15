import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { add, isSameDay, isEqual, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";
import styled from "styled-components";

import DateSchedule from "./DateSchedule";
import Modal from "./common/Modal";
import { updateAvailableDates } from "../features/counselorSlice";
import {
  TYPE_DATE,
  EXISTED_TIMELINE,
  START_DATE,
  END_DATE,
  DATE_SELECTION,
  TIME_SELECTION,
} from "../constants/date";

import "../assets/stylesheets/timepicker-custom.css";

function DailyScheduler() {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const scheduleList = useSelector(
    ({ counselor }) => counselor.data.availableDates
  ).filter(({ type }) => type === TYPE_DATE);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState({});
  const [availableDates, setAvailableDates] = useState({ type: TYPE_DATE });
  const [errorMessage, setErrorMessage] = useState(null);

  function handleClickDate(date) {
    setSelectedDate(date);
    setSelectedTime({
      startDate: "",
      endDate: "",
    });
  }

  function handleClickSaveButton() {
    if (!selectedDate || !availableDates.startDate || !availableDates.endDate) {
      setErrorMessage(TIME_SELECTION);
      return;
    }

    dispatch(
      updateAvailableDates({
        userId,
        availableDates,
      })
    );

    setAvailableDates({ type: TYPE_DATE });
  }

  function handleOnStartTimeChange(time) {
    const addedStartTime = add(selectedDate, {
      hours: time.getHours(),
    });

    setSelectedTime({
      startDate: addedStartTime,
    });

    setAvailableDates((date) => ({
      ...date,
      startDate: addedStartTime,
    }));
  }

  function handleOnEndTimeChange(time) {
    const addedEndTime = add(selectedDate, {
      hours: time.getHours(),
    });

    handleClickEndTime(time);

    setSelectedTime((time) => ({
      ...time,
      endDate: addedEndTime,
    }));

    setAvailableDates((date) => ({
      ...date,
      endDate: addedEndTime,
    }));
  }

  function handleFilterEndTime(date) {
    const selectedDate = new Date(selectedTime.startDate);

    return selectedDate.getHours() < date.getHours();
  }

  function handleStartExcludeTime() {
    const excludeTimes = [];
    let count = 0;

    getEqualSchedule(START_DATE).forEach((schedule, i) => {
      while (
        !isEqual(add(schedule, { hours: count }), getEqualSchedule(END_DATE)[i])
      ) {
        excludeTimes.push(add(schedule, { hours: count }));
        count++;
      }
      count = 0;
    });

    return excludeTimes;
  }

  function handleEndExcludeTime() {
    const excludeTimes = [];
    let count = 0;

    getEqualSchedule(START_DATE).forEach((schedule, i) => {
      while (
        !isEqual(add(schedule, { hours: count }), getEqualSchedule(END_DATE)[i])
      ) {
        count++;
        excludeTimes.push(add(schedule, { hours: count }));
      }
      count = 0;
    });

    return excludeTimes;
  }

  function getEqualSchedule(timeType) {
    const equalDateSchedule = scheduleList
      ?.filter((schedule) =>
        isSameDay(selectedDate, parseISO(schedule[timeType]))
      )
      .map((schedule) => parseISO(schedule[timeType]));

    return equalDateSchedule;
  }

  function handleClickEndTime(time) {
    const startHour = selectedTime.startDate.getHours();

    const isContained = getEqualSchedule(END_DATE).some(
      (schedule) =>
        startHour < schedule.getHours() && schedule.getHours() < time.getHours()
    );

    if (isContained) {
      setSelectedTime({
        startDate: "",
        endDate: "",
      });
      setErrorMessage(EXISTED_TIMELINE);
    }
  }

  const today = new Date();
  const nextDay = add(today, { days: 1 });

  return (
    <DatePickerContainer>
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          {errorMessage}
        </Modal>
      )}
      <div className="picker-field">
        <DatePicker
          className="date-picker"
          dateFormat="yyyy.MM.dd(eee)"
          onChange={(date) => handleClickDate(date)}
          locale={ko}
          minDate={nextDay}
          selected={selectedDate}
          placeholderText={DATE_SELECTION}
        />
        <div className="time-picker">
          <DatePicker
            selected={selectedTime.startDate}
            onChange={(time) => handleOnStartTimeChange(time)}
            excludeTimes={handleStartExcludeTime()}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            placeholderText="시작시간"
            timeCaption="Time"
            dateFormat="h:mm aa"
            disabled={!selectedDate}
          />
          <DatePicker
            selected={selectedTime.endDate}
            onChange={(time) => handleOnEndTimeChange(time)}
            filterTime={handleFilterEndTime}
            excludeTimes={handleEndExcludeTime()}
            showTimeSelect
            showTimeSelectOnly
            placeholderText="종료시간"
            timeIntervals={60}
            timeCaption="Time"
            dateFormat="h:mm aa"
            disabled={!selectedTime.startDate}
          />
          <button type="button" onClick={handleClickSaveButton}>
            저장하기
          </button>
        </div>
      </div>
      <DateSchedule onError={setErrorMessage} />
    </DatePickerContainer>
  );
}

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .picker-field {
    margin: 30px;
  }
`;

export default DailyScheduler;
