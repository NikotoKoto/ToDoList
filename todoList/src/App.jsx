import styled from "styled-components";
import AddToDo from "./components/AddTodo";
import ToDoList from "./components/TodoList";
import { useEffect, useReducer, useState } from "react";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TODO": {
      return {
        ...state,
        todoList: action.todoList,
      };
    }

    case "ADD_TODO": {
      return {
        ...state,
        todoList: [...state.todoList, action.todo],
      };
    }
    case "UPDATE_TODO": {
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo._id === action.todo._id ? action.todo : todo
        ),
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo._id !== action.todo._id),
      };
    }
    default: {
      throw new Error("Action inconnu ");
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldCancel = false;
    const fetchTodoList = async () => {
      try {
        const response = await fetch("https://restapi.fr/api/rtodo");
        if (response.ok) {
          const todos = await response.json();
          if (!shouldCancel) {
            if (Array.isArray(todos)) {
              dispatch({ type: "FETCH_TODO", todoList: todos });
            } else {
              dispatch({ type: "FETCH_TODO", todoList: [todos] });
            }
          }
        } else {
          console.log("error");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchTodoList();
    return () => {
      shouldCancel = true;
    };
  }, []);

  const addTodo = (newTodo) => {
    dispatch({ type: "ADD_TODO", todo: newTodo });
  };

  const deleteTodo = (deletedTodo) => {
    dispatch({ type: "DELETE_TODO", todo: deletedTodo });
  };

  const updateTodo = (updateTodo) => {
    dispatch({ type: "UPDATE_TODO", todo: updateTodo });
  };

  return (
    <AppStyled>
      <h1 className="title">Build a new TodoList</h1>
      <div className="card">
        <AddToDo addTodo={addTodo} />
      </div>
      <div className="card-todoList">
        {loading ? (
          <p>Chargement en cours</p>
        ) : (
          <ToDoList
            todoList={state.todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
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
