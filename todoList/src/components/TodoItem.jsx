import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";
import { useContext } from "react";
import { todoDispatcherContext } from "../context/todoContext";



export default function TodoItem({ todo }) {

  const dispatch = useContext(todoDispatcherContext);
  return (
    <TodoItemStyled>
      <span>{todo.content}</span>
      <div className="checkBoxContainer" onClick={(e) => {
          e.stopPropagation();dispatch({
   type: 'VALIDATE_TODO',
   id : todo.id
  })}}>
        {todo.done ? (
          <IoIosCheckboxOutline className="checked-icon" />
        ) : (
          <MdCheckBoxOutlineBlank className="checked-icon" />
        )}
      </div>
      <MdEditSquare className="edit-icon" onClick={(e) => {
          e.stopPropagation();dispatch({
  type: 'EDIT_TODO',
  id: todo.id
 })}} />
      <FaRegTrashAlt
        className="trash-icon"
        onClick={(e) => {
          e.stopPropagation();dispatch({
          type: "DELETE_TODO",
          id: todo.id,
        })}}
      />
    </TodoItemStyled>
  );
}

const TodoItemStyled = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;

  span {
    flex: 1;
    font-size: 18px;
  }

  .checkBoxContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .trash-icon,
  .edit-icon,
  .checked-icon {
    font-size: 25px;
    cursor: pointer;
    transition: transform 0.2s, color 0.2s;

    &:hover {
      transform: scale(1.1);
      color: black;
    }

    &:active {
      transform: scale(0.9);
      color: white;
    }
  }
`;
