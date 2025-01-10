import { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./reusable-UI/Button";
import {
  todoDispatcherContext,
  todoStateContext,
} from "../context/todoContext";

export const EditTodo = ({ todo}) => {
  const dispatch = useContext(todoDispatcherContext);
  const [value, setValue] = useState(todo.content);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleClick = () => {
    if (value.length) {
      dispatch({
        type: "SAVE_TODO",
        id: todo.id,
        content: value,
      });
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && value.length) {
      dispatch({
        type: "SAVE_TODO",
        id: todo.id,
        content: value,
      });
      setValue("");
    }
  };
  return (
    <EditTodoStyled>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="What do you want to do today?"
        className="inputTodoEdit"
      ></input>
      <Button onClick={handleClick} text="Sauvegarder" />
      <Button
        className="btn-primaryReverseEdit"
        text="Annuler"
        onClick={(e) => {
          e.stopPropagation();dispatch({
            type: 'CANCEL_TODO',
            id: todo.id,
            edit: false
           })}} 
        
      />
    </EditTodoStyled>
  );
};
const EditTodoStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  .inputTodoEdit {
    padding: 15px;
    width: 100%;

    input {
      outline: none;
      border: 0;
      width: 100%;
    }
  }

  .btn-primaryReverseEdit {
    padding: 15px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: white;
    color: #592cac;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

    &:active {
      transform: scale(0.9);
    }

    &:hover {
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;
