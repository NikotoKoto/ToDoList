import { useState } from "react";
import styled from "styled-components";

export const EditTodo = ({todo,updateTodo, cancelTodo}) => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(todo.content);


  const TryUpdateTodo = async (newTodo) => {
    const  {_id, ...newTodoWithoutId} = newTodo
    try {
      setLoading(true);
      const response = await fetch(`https://restapi.fr/api/rtodo/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify(newTodoWithoutId),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const newTodo = await response.json();
        updateTodo(newTodo);
      } else {
        console.log("il ya une erreur mon ami");
      }
    } catch (e) {
      console.log("il ya une erreur mon ami", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleClick = () => {
    if (value.length) {
      TryUpdateTodo({...todo, content: value, edit : false})
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
if(e.code === 'Enter' && value.length){
  TryUpdateTodo({...todo, content: value, edit :false});
    setValue("");
}
  }
  return (
    <EditTodoStyled>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="What do you want to do today?"
        className="inputTodoEdit"
      ></input>
      <button className="btn-primaryEdit" onClick={handleClick}>
        Sauvegarder
      </button>
      <button className="btn-primaryReverseEdit" onClick={() => TryUpdateTodo({...todo, edit : false})}>
        Annuler
      </button>
    </EditTodoStyled>
  );
}
const EditTodoStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;


  .inputTodoEdit {
    padding: 15px;
    width: 100%;

    input {
      outline: none;
      border: 0;
      width: 100%
      
    }
  }

  .btn-primaryEdit {
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

  .btn-primaryReverseEdit{
    padding: 15px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: white;
    color: #592cac;
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
