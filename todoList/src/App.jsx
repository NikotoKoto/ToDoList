import styled from "styled-components";
import AddToDo from "./components/AddTodo";
import ToDoList from "./components/TodoList";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todo) => {
  
    setTodoList([...todoList, todo]);
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };
  const validateTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  };

  const saveTodo = (id, content) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, edit: false, content } : todo
      )
    );
  };


  

  return (
    <AppStyled>
      <h1 className="title">Build a new TodoList</h1>
      <div className="card">
        <AddToDo addTodo={addTodo} />
      </div>
      <div className="card-todoList">
        <ToDoList
          todoList={todoList}
          deleteTodo={deleteTodo}
          validateTodo={validateTodo}
          editTodo={editTodo}
          saveTodo={saveTodo}
        />
      </div>
    </AppStyled>
  );
}

export default App;

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #7433aa;
  height: 100vh;

  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 60%;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .title {
    padding-bottom: 20px;
    color: white;
  }

  .card-todoList {
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
    background: #491cc7;
    width: 60%;
    height: auto;
    border-radius: 5px;
  }
`;
