import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button className="btn btn-success" onClick={handleAddTodo}>
          Agregar Tarea{" "}
        </button>
      </div>
      <div className="d-flex justify-content-center ">
        <table>
          <thead>
            <tr>
              <th>TAREAS</th>
              <th>|  ELIMINAR </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveTodo(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoList;