import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { format, addDays } from "date-fns";
import styled from "styled-components";
import axios from "axios";

import { YYYY_MM_DD, TYPE_DATE, TYPE_WEEKDAY } from "../constants/date";

import "../assets/stylesheets/datepicker-custom.css";

function ReservationDate({ counselor }) {
  const { counsel_id, user_id } = useParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [excludedTimes, setExcludedTimes] = useState([]);
  const reservedDates = [];

  async function handleClick() {
    await axios.post(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}/counselors/${user_id}`,
      {
        withCredentials: true,
      }
    );
  }

  useEffect(() => {
    handleExcludeTimes(selectedDate);
  }, []);

  function handleFilterTime(date) {
    const specificDates = counselor.counselor.availableDates?.filter(
      ({ type }) => type === TYPE_DATE
    );

    const matchedSpecificDate = specificDates?.find(
      ({ startTime, endTime }) => {
        const isSameDay =
          format(date, YYYY_MM_DD) === format(startTime, YYYY_MM_DD);

        if (!isSameDay) {
          return;
        }

        return (
          startTime.getHours() <= date.getHours() &&
          endTime.getHours() > date.getHours()
        );
      }
    );

    if (matchedSpecificDate) {
      return true;
    }

    if (Array.isArray(specificDates)) {
      for (const specificDate of specificDates) {
        if (
          format(date, YYYY_MM_DD) ===
          format(specificDate?.startTime, YYYY_MM_DD)
        ) {
          return false;
        }
      }
    }

    const weekDays = counselor.counselor.availableDates?.filter(
      ({ type }) => type === TYPE_WEEKDAY
    );

    const matchedWeekDay = weekDays
      ?.filter(({ day }) => {
        return day === date.getDay();
      })
      .find((filteredDay) => {
        return (
          filteredDay.startHour <= date.getHours() &&
          filteredDay.endHour > date.getHours()
        );
      });

    return matchedWeekDay;
  }

  function handleExcludeTimes(date) {
    const correspondingDates = reservedDates
      ?.filter((schedule) => {
        if (
          format(schedule.startTime, YYYY_MM_DD) === format(date, YYYY_MM_DD)
        ) {
          return true;
        }
      })
      .map((filteredDate) => filteredDate.startTime);

    setExcludedTimes(correspondingDates);
  }

  return (
    <>
      {counselor && (
        <>
          <DateContainer>
            <DatePicker
              inline
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              onSelect={handleExcludeTimes}
              showTimeSelect
              filterTime={handleFilterTime}
              excludeTimes={excludedTimes}
              minDate={addDays(new Date(), 2)}
              maxDate={addDays(new Date(), 28)}
            />
          </DateContainer>
          <ButtonWrapper>
            <button onClick={handleClick}>예약하기</button>
          </ButtonWrapper>
        </>
      )}
    </>
  );
}

ReservationDate.propTypes = {
  counselor: PropTypes.object,
};

export default ReservationDate;

const DateContainer = styled.div`
  padding: 0.7rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 2.5rem;
  align-items: center;
  justify-content: center;

  button {
    font-size: 3.5rem;
    padding: 1rem;
    border-radius: 3rem;
  }
`;
