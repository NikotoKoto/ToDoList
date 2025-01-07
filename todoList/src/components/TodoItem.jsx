import styled from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";
import { useState } from "react";

export default function TodoItem({ todo, deleteTodo }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <TodoItemStyled>
      <span>{todo.content}</span>
      <div className="checkBoxContainer" onClick={handleToggle}>
        {isChecked ? (
          <IoIosCheckboxOutline className="checked-icon" />
        ) : (
          <MdCheckBoxOutlineBlank className="checked-icon" />
        )}
      </div>
      <MdEditSquare className="edit-icon" />
      <FaRegTrashAlt className="trash-icon" onClick={deleteTodo} />
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
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

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

    &:hover{
      transform: scale(1.1);
      color: black;
    }

    &:active{
      transform: scale(0.9);
      color: white;
    }
  }
`;
