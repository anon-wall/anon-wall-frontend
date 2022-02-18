import styled from "styled-components";
import PropTypes from "prop-types";

function SubHeader({ heading, paragraph }) {
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
  min-height: 14rem;
  background-color: #dedfac;
  text-align: center;
  border: 3px solid black;

  .headingWrapper {
    height: 30%;
    font-family: "GangwonEdu_OTFBoldA";
  }

  .paragraphWrapper {
    height: 65%;
    font-family: "GangwonEdu_OTFBoldA";
  }

  h2 {
    width: 50%;
    margin: 0 auto;
    padding-top: 2rem;
    font-size: 3rem;
  }

  p {
    display: block;
    width: 60%;
    margin: 0 auto;
    margin-top: 3.5rem;
    font-size: 1.7rem;
    overflow: auto;
  }
`;

SubHeader.propTypes = {
  heading: PropTypes.string,
  paragraph: PropTypes.string,
};

export default SubHeader;
