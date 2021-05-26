import React from "react";
import styled from "styled-components";

const ListItem = ({text,taskId}) => {
  return (
    <Container>
      <input type="radio" name="test145" id="1" />
      <label htmlFor="1">{text}</label>
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
`;
export default ListItem;
