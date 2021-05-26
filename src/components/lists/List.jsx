import React, { useEffect, useState } from "react";
import { IoAddOutline, IoEllipsisHorizontalOutline } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import styled from "styled-components";
import ListItem from "./ListItem";
import db from "../../firebase";

const List = ({ text, selectedProjectId, listId }) => {
  const [taskArray, setTaskArray] = useState([]);
  const addTask = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newData = {
      text: data.get("AddTask"),
      createdAt: Date.now(),
      projectId: selectedProjectId,
      listId: listId,
    };
    const newDoc = db.collection("tasks").add(newData);
    newData.id = newDoc.id;
    const temp = [...taskArray, newData];
    setTaskArray(temp);
    e.target.reset();
  };

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [listId]);

  return (
    <Container>
      <ListHeading>
        <h5>{text}</h5>
        <FaLightbulb className="categoryIcon" />
        <h6 className="counter">2</h6>
        <IoEllipsisHorizontalOutline className="icon" />
      </ListHeading>

      {taskArray.map((eachItem) => (
        <ListItem key={eachItem.id} text={eachItem.text} taskId={eachItem.id} />
      ))}

      <AddTask>
        <form onSubmit={(e) => addTask(e)} className="add-list">
          <button>
            <IoAddOutline className="add-icon" size="20" />
          </button>
          <input type="text" name="AddTask" placeholder="Add Task" required />
        </form>
      </AddTask>
    </Container>
  );
};

const AddTask = styled.div`
  padding: 20px;
  display: flex;

  .add-list {
    margin: 10px;
    height: 30px;
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
const Container = styled.div`
  width: 250px;
  display: inline-block;
  margin-right: 10px;
  background-color: rgba(252, 250, 246, 0.048);
  padding: 15px;
`;

const ListHeading = styled.div`
  padding: 5px;
  align-items: center;
  display: flex;
  .counter {
    color: #9c9c9c;
    margin-left: 8px;
    font-size: 10px;
    font-weight: 500;
  }
  .icon {
    margin-left: auto;
  }
  .categoryIcon {
    margin-left: 8px;
    color: orange;
  }
`;
export default List;
