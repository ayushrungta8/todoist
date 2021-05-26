import React from "react";
import styled from "styled-components";

const SidebarCard = ({
  icon,
  text,
  notificationCount,
  selectedProjectId,
  setSelectedProjectId,
  id,
}) => {
  return (
    <Card
      onClick={() => setSelectedProjectId(id)}
      selectedProjectId={selectedProjectId}
    >
      <>{icon}</>
      <h5>{text}</h5>
      <h6 className="notificationCounter">{notificationCount}</h6>
    </Card>
  );
};

const Card = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: ${({ selectedProjectId }) =>
    !selectedProjectId ? "transparent" : "#f8e471ff"};

  h5 {
    font-size: 14px;
    font-weight: 400;
  }

  .sidebar-icon {
    color: #dc4d3d;
    padding-right: 10px;
    min-width: 30px;
  }
  .notificationCounter {
    color: #9c9c9c;
    margin-left: 8px;
    font-size: 10px;
    font-weight: 500;
  }
`;
export default SidebarCard;
