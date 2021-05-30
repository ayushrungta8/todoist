/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import styled from "styled-components";
import db from "../../firebase";
import List from "./List";

const ListContainer = ({ selectedProjectId }) => {
  const [listArray, setListArray] = useState([]);
  const deleteList = async (listId) => {
    await db.collection("lists").doc(listId).delete();
    const tasks = await db
      .collection("tasks")
      .where("listId", "==", listId)
      .get();

    tasks.forEach((task) => {
      db.collection("tasks").doc(task.id).delete();
    });
    fetchData(selectedProjectId);
  };
  const addList = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = {
      text: formData.get("AddList"),
      createdAt: Date.now(),
      projectId: selectedProjectId,
    };
    const newDoc = await db.collection("lists").add(newData);
    newData.id = newDoc.id;
    const temp = [...listArray, newData];
    setListArray(temp);
    e.target.reset();
  };
  const fetchData = async (selectedProjectId) => {
    let docs = await db
      .collection("lists")
      .orderBy("createdAt")
      .where("projectId", "==", selectedProjectId)
      .get();
    const temp = [];
    docs.forEach((record) => {
      temp.push({ ...record.data(), id: record.id });
    });
    setListArray(temp);
  };
  useEffect(() => {
    if (selectedProjectId) {
      fetchData(selectedProjectId);
    }
  }, [selectedProjectId]);

  return (
    <Container>
      {listArray.map((eachItem) => (
        <List
          key={eachItem.id}
          selectedProjectId={selectedProjectId}
          listId={eachItem.id}
          text={eachItem.text}
          fetchLists={fetchData}
          onDelete={async () => deleteList(eachItem.id)}
        />
      ))}

      {selectedProjectId && (
        <form onSubmit={(e) => addList(e)} className="add-list">
          <button>
            <IoAddOutline className="add-icon" size="20" />
          </button>
          <input
            type="text"
            name="AddList"
            placeholder="Add List"
            required
            autofocus="true"
          />
        </form>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  padding: 30px;

  .add-list {
    margin: 0px;
    margin-top: 15px;
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
export default ListContainer;
