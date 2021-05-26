import React from "react";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import styled from "styled-components";
import { BsHouseDoor } from "react-icons/bs";
const NavbarContentLeft = ({ onClick, sidebarVisible }) => {
  return (
    <LeftContainer>
      <IoMenuOutline
        size="20"
        className="icon"
        onClick={() => onClick(!sidebarVisible)}
      />
      <BsHouseDoor size="20" className="icon" />
      <div className="search-container">
        <IoSearchOutline size="20" className="search-icon" />
        <input type="text" placeholder="Find" className="search" />
      </div>
    </LeftContainer>
  );
};

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  .icon {
    color: white;
    padding-right: 15px;
    min-width: 40px;
    cursor: pointer;
  }
  .search-container {
    display: flex;
    border-radius: 2px;
    align-items: center;
    padding: 5px;
    background-color: #e37165;
  }
  .search-icon {
    color: white;
  }
  .search {
    padding-left: 5px;
    outline: none;
    border: none;
    background-color: #e37165;
    color: white;
    font-weight: 400;
    font-size: 13px;
    ::placeholder {
      color: white;
      border: none;
    }
  }
`;

export default NavbarContentLeft;
