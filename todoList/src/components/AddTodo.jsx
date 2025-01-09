import { useState } from "react";
import styled from "styled-components";
import Button from "./reusable-UI/Button";

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleClick = () => {
    if (value.length) {
      addTodo(value);
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
if(e.code === 'Enter' && value.length){
    addTodo(value);
    setValue("");
}
  }
  return (
    <AddTodoSTyled>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="What do you want to do today?"
        className="inputTodo"
      ></input>
      <Button text="Ajouter" onClick={handleClick}/>

    </AddTodoSTyled>
  );
}
const AddTodoSTyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;


  .inputTodo {
    padding: 15px;
    width: 100%;

    input {
      outline: none;
      border: 0;
      width: 100%
      
    }
  }

`;
