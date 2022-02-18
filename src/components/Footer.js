import styled from "styled-components";

import { COPYRIGHT } from "../constants/home";

function Footer() {
  return (
    <FooterWrapper>
      <div className="copyright">
        <span>&copy; </span>
        <span className="copyright-message">{COPYRIGHT}</span>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.footer_bg};

  .copyright {
    font-size: ${({ theme }) => theme.fontSizes.lll};
  }

  .copyright-message {
    font-family: "GangwonEdu_OTFBoldA";
  }
`;

export default Footer;
