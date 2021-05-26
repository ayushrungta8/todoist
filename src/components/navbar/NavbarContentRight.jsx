import React from "react";
import {
  IoAddOutline,
  IoNotificationsOutline,
  IoPieChartOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import styled from "styled-components";

const NavbarContentRight = () => {
  return (
    <RightContainer>
      <IoAddOutline size="20" className="icon" />
      <IoPieChartOutline size="20" className="icon" />
      <IoNotificationsOutline size="20" className="icon" />
      <IoSettingsOutline size="20" className="icon" />
    </RightContainer>
  );
};
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  .icon {
    color: white;
    padding-right: 15px;
    min-width: 40px;
    cursor: pointer;
  }
`;
export default NavbarContentRight;
