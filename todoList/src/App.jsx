import styled from "styled-components";
import AddToDo from "./components/AddTodo";
import ToDoList from "./components/TodoList";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [ loading,setLoading] = useState(true)

  useEffect(() => {
    let shouldCancel = false;
    const fetchTodoList = async () => {
      try {
        const response = await fetch("https://restapi.fr/api/rtodo");
        if (response.ok) {
          const todos = await response.json();
          if(!shouldCancel){
            if (Array.isArray(todos)) {
              setTodoList(todos);
            } else {
              setTodoList([todos]);
            }
          } 
          }else
          {
          console.log("error");
        }
      } catch (e) {
        console.log(e);
      }finally{
        setLoading(false);
      }
    };

    fetchTodoList();
    return () => {
      shouldCancel = true;
    }
  }, []);

  const addTodo = (todo) => {
    setTodoList([...todoList, todo]);
  };

  const deleteTodo = (_id) => {
    setTodoList(todoList.filter((todo) => todo._id !== _id));
  };
  const validateTodo = (_id) => {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const editTodo = (_id) => {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  };

  const saveTodo = (_id, content) => {
    setTodoList(
      todoList.map((todo) =>
        todo._id === _id ? { ...todo, edit: false, content } : todo
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
        {loading ? <p>Chargement en cours</p> : <ToDoList
          todoList={todoList}
          deleteTodo={deleteTodo}
          validateTodo={validateTodo}
          editTodo={editTodo}
          saveTodo={saveTodo}
        />}
        
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
