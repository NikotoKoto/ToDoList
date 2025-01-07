import styled from "styled-components";
import TodoItem from "./TodoItem";

export default function ToDoList({ todoList, deleteTodo }) {
  return todoList.length ? (
    <TodoListStyled>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo.id)}
        />
      ))}
    </TodoListStyled>
  ) : (
    <NoTodoMessage>Aucune todo pour le moment</NoTodoMessage>
  );
}

const TodoListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 0 0 15px;
  list-style-type: none;
`;

const NoTodoMessage = styled.p`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  font-size: 18px;
`;
