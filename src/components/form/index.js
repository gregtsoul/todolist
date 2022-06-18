import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Input from "@mui/material/Input";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../Todo";
import { Button } from "@mui/material";
import styled from "styled-components";

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 15px;
`;

function Form() {
  const inputRef = useRef();
  const [todoValue, setTodoValue] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const saveValue = () => {
    if (todoValue?.replace(/\s/g, "").length > 0) {
      let getTodos =
        localStorage.getItem("todos") &&
        localStorage.getItem("todos").length > 0
          ? JSON.parse(localStorage.getItem("todos"))
          : [];
      getTodos.push({ id: uuidv4(), todoValue, completed: false });
      localStorage.setItem("todos", JSON.stringify(getTodos));
      inputRef.current.value = "";
      setTodoValue("");
      getAllTodos();
    }
  };

  const getAllTodos = () => {
    setAllTodos(JSON.parse(localStorage.getItem("todos")));
  };

  useEffect(() => {
    getAllTodos();

    return () => {};
  }, []);

  const update = async () => {
    getAllTodos();
  };

  const checkListFun = (id) => {
    setCheckedList((checkedList) => [...checkedList, { id }]);
  };

  const removeIt = (id) => {
    let get = checkedList.length > 0 && checkedList.filter((p) => p.id !== id);
    setCheckedList(get);
  };

  const submitHandler = async () => {
    allTodos.map((td) => {
      return checkedList.map(
        (check) => check.id === td.id && (td.completed = true)
      );
    });
    localStorage.setItem("todos", JSON.stringify(allTodos));
    getAllTodos();
  };

  const handleChange = (e) => {
    setTodoValue(e.target.value);
    setAllTodos(allTodos);
  };

  const EnterBtn = (e) => {
    if (e.key === "Enter") {
      saveValue();
    }
  };

  return (
    <>
      <div className="container">
        <h2>
          My Todo List{" "}
          {`(${
            allTodos ? allTodos.filter((td) => !td.completed).length : "0"
          })`}
        </h2>
        <div className="form-container">
          <div className="form-header">
            <div className="search">
              <Input
                inputRef={inputRef}
                onChange={handleChange}
                placeholder="Search task"
                onKeyDown={EnterBtn}
              />
            </div>
            <AddCircleOutlineIcon className="btn" onClick={saveValue} />
          </div>
          <ul type="none">
            {allTodos &&
              allTodos
                .filter((td) => !td.completed)
                .filter((td) =>
                  td.todoValue
                    .toLocaleLowerCase()
                    .includes(todoValue.toLowerCase())
                )
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      removeIt={removeIt}
                      checkListFun={checkListFun}
                      update={update}
                      todo={todo}
                      allTodos={allTodos}
                    />
                  );
                })}
            {allTodos &&
              allTodos
                .filter((td) => td.completed)
                .filter((td) =>
                  td.todoValue
                    .toLocaleLowerCase()
                    .includes(todoValue.toLowerCase())
                )
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      removeIt={removeIt}
                      checkListFun={checkListFun}
                      update={update}
                      todo={todo}
                      allTodos={allTodos}
                    />
                  );
                })}

            {checkedList && checkedList.length > 0 && (
              <ButtonContainer>
                <Button onClick={submitHandler}>Mark Complete</Button>
              </ButtonContainer>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Form;
