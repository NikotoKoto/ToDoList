import { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./reusable-UI/Button";
import { todoDispatcherContext } from "../context/todoContext";



export default function AddTodo() {
  const [value, setValue] = useState("");
  const dispatch = useContext(todoDispatcherContext)
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleClick = () => {
    if (value.length) {
      dispatch({
        type: 'ADD_TODO',
        content : value,
      })
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
if(e.code === 'Enter' && value.length){
  dispatch({
    type: 'ADD_TODO',
    content : value,
  })
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
