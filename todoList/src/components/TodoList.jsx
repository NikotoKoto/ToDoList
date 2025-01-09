import styled from "styled-components";
import TodoItem from "./TodoItem";
import {EditTodo} from "./EditTodo";
import { useContext } from "react";
import { todoStateContext } from "../context/todoContext";

export default function ToDoList() {
  const state = useContext(todoStateContext)
  return state.todoList.length ? (
    <TodoListStyled>
      {state.todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo.id} todo={todo}  />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            
          />
        )
      )}
    </TodoListStyled>
  ) : (
    <NoTodoMessage>Aucune todo pour le moment</NoTodoMessage>
  );
}

const TodoListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 20px;
  list-style-type: none;
`;

const NoTodoMessage = styled.p`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  font-size: 18px;
`;
