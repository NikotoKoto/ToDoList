import styled from "styled-components";
import AddToDo from "./components/AddTodo";
import ToDoList from "./components/TodoList";
import { useReducer } from "react";
import todoReducer from "./reducers/todoReducer";
import { todoStateContext } from "./context/todoContext";
import { todoDispatcherContext } from "./context/todoContext";
function App() {

  const [state, dispatch] = useReducer(todoReducer, {
    todoList: [],
  })



  

  return (
    <todoStateContext.Provider value= {state}>
      <todoDispatcherContext.Provider value={dispatch}>
    <AppStyled>
      <h1 className="title">Build a new TodoList</h1>
      <div className="card">
        <AddToDo />
      </div>
      <div className="card-todoList">
        <ToDoList
                  />
      </div>
    </AppStyled>
    </todoDispatcherContext.Provider>
    </todoStateContext.Provider>
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
