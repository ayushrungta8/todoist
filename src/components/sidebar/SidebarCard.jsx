import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import db from "../../firebase";

const SidebarCard = ({
  icon,
  text,
  notificationCount,
  selectedProjectId,
  setSelectedProjectId,
  id,
  onDelete,
  fetchData,
}) => {
  const [updateTextBoxVisible, setupdateTextBoxVisible] = useState(false);
  const updateText = async (e) => {
    const data = new FormData(e.target);
    const newText = data.get("editText");
    e.preventDefault();
    await db.collection("projects").doc(id).update({ text: newText });
    setupdateTextBoxVisible(!updateTextBoxVisible);
    fetchData();
  };

  return (
    <Container selectedProjectId={selectedProjectId}>
      <div className="card" onClick={() => setSelectedProjectId(id)}>
        <>{icon}</>
        <h5>{text}</h5>
        <h6 className="notificationCounter">{notificationCount}</h6>
      </div>
      {updateTextBoxVisible && (
        <form onSubmit={updateText} className="updateTextBox">
          <input type="text" name="editText" autoFocus />
        </form>
      )}

      <div
        className="edit-container"
        onClick={() => setupdateTextBoxVisible(!updateTextBoxVisible)}
      >
        <FaPencilAlt size="10" className="edit" />
      </div>
      <div className="close-container" onClick={onDelete}>
        <IoCloseOutline size="15" className="close" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: ${({ selectedProjectId }) =>
    !selectedProjectId ? "transparent" : "#c4c1c1"};
  color: ${({ selectedProjectId }) => (!selectedProjectId ? "white" : "black")};

  .updateTextBox {
    position: absolute;
  }

  .edit {
    color: transparent;
  }
  .close {
    color: transparent;
  }
  :hover {
    .close {
      color: #dc4d3d;
    }
    .close-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;
      margin-left: auto;
      cursor: pointer;

      :hover {
        background-color: #ee5e5e;
        .close {
          color: white;
        }
      }
    }
    .edit {
      color: #dc4d3d;
    }
    .edit-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      margin-left: auto;
      cursor: pointer;

      :hover {
        background-color: #ee5e5e;
        .edit {
          color: white;
        }
      }
    }
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    padding-left: 5px;
    padding-right: 5px;
    width: 100%;
    :focus {
      background-color: #fff;
    }
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
    align-items: center;
    cursor: pointer;
  }
`;
export default SidebarCard;
