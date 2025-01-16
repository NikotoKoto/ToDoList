import styled from "styled-components";
import TodoItem from "./TodoItem";
import {EditTodo} from "./EditTodo";

export default function ToDoList({ todoList, deleteTodo, updateTodo }) {
  return todoList.length ? (
    <TodoListStyled>
      {todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo.id} todo={todo} updateTodo={updateTodo}/>
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={()=> deleteTodo(todo.id)}
            
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
