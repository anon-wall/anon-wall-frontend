import styled from "styled-components";

import { COPYRIGHT } from "../constants/home";

function Footer() {
  return (
    <FooterWrapper>
      <div className="copyright">
        <span>&copy; </span>
        {COPYRIGHT}
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  border-top: 1px solid black;
  background-color: ${({ theme }) => theme.colors.footer_bg};

  .copyright {
    font-size: ${({ theme }) => theme.fontSizes.lll};
  }
`;

export default Footer;
