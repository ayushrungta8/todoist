import React, { useEffect, useState } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { FaLightbulb, FaPencilAlt } from "react-icons/fa";
import styled from "styled-components";
import Task from "./Task";
import db from "../../firebase";

const List = ({ text, selectedProjectId, listId, onDelete, fetchLists }) => {
  const [taskArray, setTaskArray] = useState([]);
  const deleteTask = async (taskId) => {
    await db.collection("tasks").doc(taskId).delete();
    await fetchData(listId);
  };
  const addTask = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newData = {
      text: data.get("AddTask"),
      createdAt: Date.now(),
      projectId: selectedProjectId,
      listId: listId,
      isChecked: false,
    };
    const newDoc = db.collection("tasks").add(newData);
    newData.id = newDoc.id;
    const temp = [...taskArray, newData];
    setTaskArray(temp);
    e.target.reset();
    fetchData(listId);
  };
  const fetchData = async (listId) => {
    let docs = await db
      .collection("tasks")
      .orderBy("createdAt")
      .where("listId", "==", listId)
      .get();

    const temp = [];
    docs.forEach((record) => {
      temp.push({ ...record.data(), id: record.id });
    });
    setTaskArray(temp);
  };
  useEffect(() => {
    fetchData(listId);
  }, [listId]);

  const [updateTextBoxVisible, setupdateTextBoxVisible] = useState(false);
  const updateList = async (e) => {
    const data = new FormData(e.target);
    const newText = data.get("editListName");
    e.preventDefault();
    await db.collection("lists").doc(listId).update({ text: newText });
    setupdateTextBoxVisible(!updateTextBoxVisible);
    fetchLists(selectedProjectId);
  };

  return (
    <Container>
      <ListHeading>
        <h5>{text}</h5>
        <FaLightbulb className="categoryIcon" />
        <h6 className="counter">2</h6>
        <div
          className="edit-container"
          onClick={() => setupdateTextBoxVisible(!updateTextBoxVisible)}
        >
          <FaPencilAlt size="10" className="edit" />
        </div>
        {updateTextBoxVisible && (
          <form onSubmit={updateList} className="updateTextBox">
            <input type="text" name="editListName" autoFocus />
          </form>
        )}

        <div className="close-container" onClick={onDelete}>
          <IoCloseOutline size="10" className="close" />
        </div>
      </ListHeading>

      {taskArray.map((eachItem) => (
        <Task
          key={eachItem.id}
          text={eachItem.text}
          taskId={eachItem.id}
          onDelete={async () => await deleteTask(eachItem.id)}
          isChecked={eachItem.isChecked}
          fetchData={fetchData}
          listId={listId}
        />
      ))}

      <AddTask>
        <form onSubmit={(e) => addTask(e)} className="add-task">
          <button>
            <IoAddOutline className="add-icon" size="20" />
          </button>
          <input
            type="text"
            name="AddTask"
            placeholder="Add Task"
            required
            autoFocus
          />
        </form>
      </AddTask>
    </Container>
  );
};

const AddTask = styled.div`
  /* padding: 20px; */
  display: flex;
  /* border: 1px solid red; */

  .add-task {
    margin: 0px;
    margin-top: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
    background-color: #ffffff;

    button {
      border: none;
      /* border-right: 1px solid #b4b2b2; */
      background: none;
      margin: none;
      padding: 5px;
      display: flex;
      cursor: pointer;
      color: #dc4d3d;
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
const Container = styled.div`
  width: 250px;
  display: inline-block;
  margin-right: 10px;
  background-color: rgba(252, 250, 246, 0.048);
  padding: 15px;
`;

const ListHeading = styled.div`
  position: relative;
  padding: 5px;
  align-items: center;
  display: flex;
  .edit {
    color: transparent;
  }
  .close {
    color: transparent;
  }
  .updateTextBox {
    position: absolute;
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
      margin-left: 0;
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
  .counter {
    color: #9c9c9c;
    margin-left: 8px;
    font-size: 10px;
    font-weight: 500;
  }
  .icon {
    margin-left: auto;
    margin-right: 0;
  }
  .categoryIcon {
    margin-left: 8px;
    color: orange;
  }

  .close-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    /* width: 20px;
    height:100%; */
    margin-left: 5px;
    cursor: pointer;
    :hover {
      background-color: #ee5e5e;
      .close {
        color: white;
      }
    }
  }
`;
export default List;
