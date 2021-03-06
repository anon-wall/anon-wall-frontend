import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { format, addDays, addMinutes, parseISO } from "date-fns";
import styled from "styled-components";

import Modal from "./common/Modal";
import { getCounselorSchedule, updateCounsel } from "../api/axios";
import { YYYY_MM_DD, TYPE_DATE, TYPE_WEEKDAY } from "../constants/date";

import "../assets/stylesheets/datepicker-custom.css";

function ReservationDate({ counselor }) {
  const { counsel_id, user_id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 2));
  const [confirmedDate, setConfirmedData] = useState(null);
  const [excludedTimes, setExcludedTimes] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);

  const [isModalOn, setIsModalOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCounselorSchedule({
          counselorId: counselor._id,
          userId: user_id,
        });

        setReservedDates(data.data);
      } catch (err) {
        setErrorMessage(err.data.message);
      }
    })();
  }, []);

  async function handleClick() {
    try {
      await updateCounsel({
        counselId: counsel_id,
        userId: user_id,
        startDate: selectedDate,
        endDate: addMinutes(selectedDate, 25),
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
      setIsSuccessful(true);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  }

  function handleFilterTime(date) {
    const specificDates = counselor.counselor.availableDates?.filter(
      ({ type }) => type === TYPE_DATE
    );

    const matchedSpecificDate = specificDates?.find(
      ({ startDate, endDate }) => {
        const isSameDay =
          format(date, YYYY_MM_DD) === format(new Date(startDate), YYYY_MM_DD);

        if (!isSameDay) {
          return;
        }

        return (
          new Date(startDate).getHours() <= date.getHours() &&
          new Date(endDate).getHours() > date.getHours()
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
          format(new Date(specificDate?.startDate), YYYY_MM_DD)
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
          format(new Date(schedule.startDate), YYYY_MM_DD) ===
          format(date, YYYY_MM_DD)
        ) {
          return true;
        }
      })
      .map((filteredDate) => {
        return parseISO(filteredDate.startDate);
      });

    setExcludedTimes(correspondingDates);
  }

  function handleOnChange(date) {
    if (
      date.getHours() === selectedDate.getHours() &&
      date.getMinutes() === selectedDate.getMinutes()
    ) {
      setSelectedDate(date);
      return;
    }

    setIsModalOn(false);
    setSelectedDate(date);
    setConfirmedData(date);
  }

  return (
    <>
      {counselor && (
        <>
          {errorMessage && (
            <Modal onClick={setErrorMessage} width="50rem" height="20rem">
              <p>{errorMessage}</p>
            </Modal>
          )}
          {isSuccessful && (
            <Modal width="50rem" height="20rem">
              <p>??????????????? ?????????????????????! 3?????? ????????? ???????????????.</p>
            </Modal>
          )}
          {isModalOn && !errorMessage && (
            <Modal onClick={setIsModalOn} width="55rem" height="45rem">
              <DateContainer>
                <DatePicker
                  inline
                  showTimeSelect
                  selected={selectedDate}
                  onChange={handleOnChange}
                  onSelect={handleExcludeTimes}
                  filterTime={handleFilterTime}
                  excludeTimes={excludedTimes}
                  minDate={addDays(new Date(), 2)}
                  maxDate={addDays(new Date(), 28)}
                />
              </DateContainer>
            </Modal>
          )}
          <ConfirmedDateWrapper onClick={setIsModalOn}>
            {confirmedDate ? (
              <>
                <p className="confirmed-date">
                  {format(confirmedDate, "M??? dd???, EEE")}
                </p>
                <p className="confirmed-time">
                  {`${format(confirmedDate, "p")}~${format(
                    addMinutes(confirmedDate, 25),
                    "p"
                  )}`}
                </p>
              </>
            ) : (
              <p>????????? ???????????????.</p>
            )}
          </ConfirmedDateWrapper>
          <ButtonWrapper>
            <button onClick={handleClick} disabled={!confirmedDate}>
              ????????????
            </button>
          </ButtonWrapper>
        </>
      )}
    </>
  );
}

ReservationDate.propTypes = {
  counselor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    notification: PropTypes.number.isRequired,
    counselor: PropTypes.object.isRequired,
  }),
};

const DateContainer = styled.div`
  padding: 0.7rem;
  margin: 0 auto;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
`;

const ConfirmedDateWrapper = styled.div`
  padding: 2rem;
  margin: 0 auto;
  margin-top: 2.5rem;
  border: 0.5rem solid #bfaea4;
  border-radius: 3rem;
  font-size: 2rem;
  cursor: pointer;

  .confirmed-date {
    color: #c05050;
    font-weight: 600;
  }

  .confirmed-time {
    margin-top: 0.2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 2.5rem;
  align-items: center;
  justify-content: center;

  button {
    padding: 1rem;
    border-radius: 3rem;
    font-size: 2.5rem;
    cursor: pointer;
  }
`;

export default ReservationDate;
