import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";
import db from "../../firebase";

const Task = ({ text, taskId, onDelete, isChecked, fetchData, listId }) => {
  const updateChecked = async (isChecked) => {
    await db.collection("tasks").doc(taskId).update({
      isChecked: isChecked,
    });
    fetchData(listId);
  };
  return (
    <Container isChecked={isChecked}>
      <input
        type="checkbox"
        name="test145"
        checked={isChecked}
        onChange={() => updateChecked(!isChecked)}
      />
      <label>{text}</label>
      <div className="close-container" onClick={onDelete}>
        <IoCloseOutline size="10" className="close" />
      </div>
    </Container>
  );
};
const Container = styled.div`
  white-space: normal;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition-property: box-shadow, border-color;
  transition-duration: 0.3s;

  /* box-shadow: 0px 0px 2px #6d6c6c; */
  & label {
    font-size: 14px;
    font-weight: 400;
    hyphens: auto;
    cursor: pointer;
  }
  input {
    margin-right: 10px;
    cursor: pointer;
  }
  :hover {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
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
    /* width: 20px;
    height:100%; */
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
