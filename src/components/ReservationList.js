import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";

import ReservationListEntry from "./ReservationListEntry";
import StyledTransparentButton from "./shared/StyledTransparentButton";
import { PREV, NEXT } from "../constants/story";

function ReservationList({ payload, onError }) {
  const [counsels, setCounsels] = useState([]);
  const [page, setPage] = useState(1);
  const [hasPage, setHasPage] = useState({
    prev: false,
    next: false,
  });

  const { type, userId } = payload;

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/reserved`,
          {
            params: {
              [type === "counselee" ? "counselee" : "counselor"]: userId,
              page,
            },
            withCredentials: true,
          }
        );

        setCounsels(data.data.reservedCounsels);
        setHasPage({
          ...hasPage,
          prev: data.data.hasPrevPage,
          next: data.data.hasNextPage,
        });
      })();
    } catch (err) {
      onError(err.data.message);
    }
  }, [userId]);

  function handleClickPrevButton() {
    setPage((page) => page - 1);
  }
  function handleClickNextButton() {
    setPage((page) => page + 1);
  }

  return (
    <>
      <ReservationContainer>
        {counsels?.map((counsel) => {
          return (
            <ReservationListEntry
              key={counsel._id}
              counsel={counsel}
              type={type}
            />
          );
        })}
      </ReservationContainer>
      <PaginationWrapper>
        {hasPage.prev && (
          <StyledTransparentButton onClick={handleClickPrevButton}>
            {PREV}
          </StyledTransparentButton>
        )}
        {hasPage.next && (
          <StyledTransparentButton onClick={handleClickNextButton}>
            {NEXT}
          </StyledTransparentButton>
        )}
      </PaginationWrapper>
    </>
  );
}

const ReservationContainer = styled.section`
  display: flex;
  flex-wrap: no-wrap;
  width: 90%;
  min-height: 20rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.5rem solid #c9bab2;
  border-radius: 3rem;
  overflow: scroll;
  font-size: 1.8rem;
`;

const PaginationWrapper = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
`;

ReservationList.propTypes = {
  payload: PropTypes.shape({
    type: PropTypes.string,
    userId: PropTypes.string,
  }),
  onError: PropTypes.func,
};

export default ReservationList;
