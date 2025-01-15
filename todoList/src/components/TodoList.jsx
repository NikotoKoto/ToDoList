import styled from "styled-components";
import TodoItem from "./TodoItem";
import {EditTodo} from "./EditTodo";

export default function ToDoList({ todoList, deleteTodo, validateTodo,editTodo, saveTodo }) {
  return todoList.length ? (
    <TodoListStyled>
      {todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo.id} todo={todo} cancelTodo = {()=> editTodo(todo.id)} saveTodo={(content)=> saveTodo(todo.id, content)}/>
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            validateTodo={() => validateTodo(todo._id)}
            deleteTodo={() => deleteTodo(todo._id)}
            editTodo={()=> editTodo(todo._id) }
            
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
