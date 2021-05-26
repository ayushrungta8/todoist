import React from "react";
import styled from "styled-components";
import NavbarContentLeft from "./NavbarContentLeft";
import NavbarContentRight from "./NavbarContentRight";

const Navbar = ({ onClick, sidebarVisible }) => {
  return (
    <NavbarContainer>
      <NavbarContentLeft onClick={onClick} sidebarVisible={sidebarVisible} />
      <NavbarContentRight />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  justify-content: space-between;
  display: flex;
  height: 40px;
  width: 100vw;
  background-color: #dc4d3d;
  /* position: fixed; */
  /* z-index: 500; */

  p {
    color: white;
  }
`;
export default Navbar;
