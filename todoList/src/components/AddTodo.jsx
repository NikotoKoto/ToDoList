import { useState } from "react";
import styled from "styled-components";

export default function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const createTodo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://restapi.fr/api/rtodo", {
        method: "POST",
        body: JSON.stringify({
          content: value,
          done: false,
          edit: false,
          isSelected: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      } else {
        setError("Une erreur est survenue Mec");
      }
    } catch (e) {
      setError("Une erreur est survenue Mec",e);
    } finally {
      setLoading(false);
    }
    setValue("");
  };
  const handleClick =  () => {
    if (value.length) {
      createTodo();
     
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && value.length) {
      createTodo();

    }
  };
  return (
    <AddTodoSTyled>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="What do you want to do today?"
        className="inputTodo"
      ></input>
      <button className="btn-primary" onClick={handleClick}>
        {loading ? "Chargement" : "Ajouter"}
      </button>
    </AddTodoSTyled>
  );
}
const AddTodoSTyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  .inputTodo {
    padding: 15px;
    width: 100%;

    input {
      outline: none;
      border: 0;
      width: 100%;
    }
  }

  .btn-primary {
    padding: 15px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: #592cac;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

    &:active {
      transform: scale(0.9);
    }

    &:hover {
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;
