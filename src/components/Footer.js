import styled from "styled-components";
import { Icon } from "@iconify/react";

import { COPYRIGHT } from "../constants/home";

function Footer() {
  return (
    <FooterWrapper>
      <div className="copyright">{COPYRIGHT}</div>
      <div className="icon">
        <Icon className="health-icon" icon="healthicons:agriculture-outline" />
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 10rem;
  background-color: rgba(225, 219, 214, 1);

  .copyright {
    text-align: center;
    font-size: 3rem;
  }

  .icon {
    float: right;
    margin: 1rem;
  }

  .health-icon {
    width: 8rem;
    height: 8rem;
  }
`;

export default Footer;
