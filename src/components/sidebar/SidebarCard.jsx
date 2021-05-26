import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";

const SidebarCard = ({
  icon,
  text,
  notificationCount,
  selectedProjectId,
  setSelectedProjectId,
  id,
  onDelete,
}) => {
  return (
    <Container selectedProjectId={selectedProjectId}>
      <div className="card" onClick={() => setSelectedProjectId(id)}>
        <>{icon}</>
        <h5>{text}</h5>
        <h6 className="notificationCounter">{notificationCount}</h6>
      </div>
      <div className="close-container" onClick={onDelete}>
        <IoCloseOutline size="10" className="close" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: ${({ selectedProjectId }) =>
    !selectedProjectId ? "transparent" : "#c4c1c1"};
  /* color: ${({ selectedProjectId }) =>
    !selectedProjectId ? "black" : "white"}; */
  h5 {
    font-size: 14px;
    font-weight: 400;
  }

  .sidebar-icon {
    color: #dc4d3d;
    padding-right: 10px;
    min-width: 30px;
    margin-top: 2px;
  }
  .notificationCounter {
    color: #9c9c9c;
    margin-left: 8px;
    font-size: 10px;
    font-weight: 500;
  }
  .card {
    width: 100%;
    display: flex;
    cursor: pointer;
  }
  .close {
    color: red;
  }
  .close-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin-left: auto;
    cursor: pointer;

    :hover {
      background-color: #ee5e5e;
      .close {
        color: white;
      }
    }
  }
`;
export default SidebarCard;
