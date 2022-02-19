import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });

    return () => {
      ref.current = null;
    };
  }, []);

  return <StyledVideo autoPlay playsInline ref={ref} />;
}

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

Video.propTypes = {
  peer: PropTypes.object,
};
