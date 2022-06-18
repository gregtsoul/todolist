import { Input } from "@material-ui/core";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { DoneOutline } from "@material-ui/icons";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  margin: 0px;
  padding: 0px;
`;
const InputContainer = styled(Input)`
  text-decoration: ${(props) =>
    props.completed === "true" ? "line-through" : ""};
`;

export const Todo = ({ todo, allTodos, update, checkListFun, removeIt }) => {
  const [todoValue, setTodoValue] = useState(todo.todoValue);
  const [active, setActive] = useState(false);

  const handleSubmit = (id) => {
    allTodos.map((td) => td.id === id && (td.todoValue = todoValue));
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setActive(false);
  };

  const deleteHandler = (td) => {
    let newArray = update() && allTodos.filter((g) => g.id !== td.id);
    localStorage.setItem("todos", JSON.stringify(newArray));
    update();
  };

  const onChange = (e) => {
    if (e.target.checked) {
      checkListFun(e.target.value);
    } else {
      removeIt(e.target.value);
    }
  };

  return (
    <li>
      <Checkbox value={todo.id} onChange={onChange} />
      <div className="input">
        <InputContainer
          completed={todo.completed.toString()}
          readOnly={!active}
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
        />
      </div>
      <div className="buttons">
        {todo.completed && <DoneOutline />}
        {!active ? (
          <Button disabled={todo.completed} onClick={() => setActive(true)}>
            <EditOutlinedIcon />
          </Button>
        ) : (
          <DoneIcon onClick={() => handleSubmit(todo.id)} className="btn" />
        )}
        <Button onClick={() => deleteHandler(todo)}>
          <DeleteOutlinedIcon />
        </Button>
      </div>
    </li>
  );
};
