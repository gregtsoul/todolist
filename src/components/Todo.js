import { Input } from "@material-ui/core";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { DoneOutline } from "@material-ui/icons";

export const Todo = ({ todo, allTodos, update, checkListFun, removeIt }) => {
  const [todoValue, setTodoValue] = useState(todo.todoValue);
  const [active, setActive] = useState(false);

  const handleSubmit = async (id) => {
    allTodos.map((td) => td.id == id && (td.todoValue = todoValue));
    console.log(allTodos);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setActive(false);
  };

  const deleteHandler = async (td) => {
    let newArray = update() && allTodos.filter((g) => g.id != td.id);
    localStorage.setItem("todos", JSON.stringify(newArray));
    document.location.reload();
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
        <Input
          readOnly={!active}
          onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
        />
      </div>
      <div className="buttons">
        {todo.completed && <DoneOutline />}

        {!active ? (
          <EditOutlinedIcon onClick={() => setActive(true)} />
        ) : (
          <DoneIcon onClick={() => handleSubmit(todo.id)} className="btn" />
        )}
        <DeleteOutlinedIcon
          className="btn"
          onClick={() => deleteHandler(todo)}
        />
      </div>
    </li>
  );
};
