import React from "react";
import { IoAddOutline, IoApps } from "react-icons/io5";
import styled from "styled-components";
import SidebarCard from "./SidebarCard";

const Sidebar = ({
  addProject,
  projectArray,
  selectedProjectId,
  setSelectedProjectId,
  onDelete,
  fetchData,
}) => {
  return (
    <SidebarContainer>
      {projectArray.map((eachItem) => (
        <SidebarCard
          fetchData={fetchData}
          key={eachItem.id}
          icon={<IoApps size="15" className="sidebar-icon" />}
          text={eachItem.text}
          notificationCount={eachItem.notificationCount}
          setSelectedProjectId={setSelectedProjectId}
          id={eachItem.id}
          selectedProjectId={selectedProjectId === eachItem.id}
          onDelete={() => onDelete(eachItem.id)}
        />
      ))}

      <form onSubmit={(e) => addProject(e)} className="add-project">
        <button>
          <IoAddOutline className="add-icon" size="20" />
        </button>
        <input
          type="text"
          name="AddProject"
          placeholder="Add Project"
          required
          autoFocus={false}
        />
      </form>
    </SidebarContainer>
  );
};
const SidebarContainer = styled.div`
  background-color: #f3efef;
  height: calc(100vh - 40px);
  width: 250px;
  min-width: 250px;
  padding: 30px 10px 30px 30px;
  overflow-y: auto;
  .add-project {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;
    background-color: #e9e5e5;

    button {
      border: none;
      border-right: 1px solid #b4b2b2;
      background: none;
      margin: none;
      padding: 5px;
      display: flex;
      cursor: pointer;
    }

    input {
      border: none;
      background: none;
      padding: 5px;
      outline: none;
      padding: 5px;
    }
  }
`;
export default Sidebar;
