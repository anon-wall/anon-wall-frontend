import styled from "styled-components";
import PropTypes from "prop-types";

export default function SubHeader({ heading, paragraph }) {
  return (
    <SubHeaderWrapper>
      <div className="headingWrapper">
        <h2>{heading}</h2>
      </div>
      <div className="paragraphWrapper">
        <p>{paragraph}</p>
      </div>
    </SubHeaderWrapper>
  );
}

const SubHeaderWrapper = styled.div`
  width: 100%;
  height: 20rem;
  background-color: #dedfac;
  text-align: center;

  .headingWrapper {
    height: 30%;
  }

  .paragraphWrapper {
    height: 65%;
  }

  h2 {
    width: 50%;
    margin: 0 auto;
    padding-top: 2rem;
    font-size: 3.5rem;
  }

  p {
    display: block;
    width: 60%;
    margin: 0 auto;
    margin-top: 3rem;
    font-size: 2rem;
    overflow: auto;
  }
`;

SubHeader.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
};