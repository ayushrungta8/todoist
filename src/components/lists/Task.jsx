import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import db from "../../firebase";

const Task = ({ text, taskId, onDelete, isChecked, fetchData, listId }) => {
  /*-------------Update Checkbox---------------*/
  const updateChecked = async (isChecked) => {
    await db.collection("tasks").doc(taskId).update({
      isChecked: isChecked,
    });
    fetchData(listId);
  };

  return (
    <Container onClick={() => updateChecked(!isChecked)} draggable>
      {isChecked && <div class="overlay"></div>}
      <input type="checkbox" name="test145" checked={isChecked} />
      <label style={{ textDecoration: isChecked ? "line-through" : "" }}>
        {text}
      </label>
      <div className="close-container" onClick={onDelete}>
        <IoCloseOutline size="10" className="close" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  white-space: normal;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition-property: box-shadow;
  transition-duration: 0.3s;
  :hover {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 1px 2px 8px 0 rgb(0 0 0 / 10%);
    cursor: pointer;

    .close {
      color: red;
      z-index: 1000;
    }
  }

  .overlay {
    border: 1px solid rgba(0, 0, 0, 0.12);
    z-index: 100;
    border-radius: 4px;
    position: absolute;
    top: 0px;
    left: 0;
    background-color: #4e4e4e;
    opacity: 20%;
    width: 100%;
    height: 100%;
    /* text-decoration: line-through; */
  }

  & label {
    font-size: 14px;
    font-weight: 400;
    hyphens: auto;
    cursor: pointer;
  }

  input {
    margin-right: 10px;
    cursor: pointer;
    z-index: 1000;
  }

  .close {
    color: transparent;
    z-index: 1000;
  }

  .close-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin-left: auto;
    :hover {
      background-color: #ee5e5e;
      .close {
        color: white;
      }
    }
  }
`;
export default Task;
