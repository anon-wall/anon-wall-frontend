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
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;

Video.propTypes = {
  peer: PropTypes.object,
};
