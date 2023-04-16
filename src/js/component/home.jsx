import React, { useState, useEffect } from "react";


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      ////setTodos([...todos, inputValue.trim()]);
      let tempTodos = [...todos];
      tempTodos.push({label: inputValue.trim(), done: false});
      setTodos(tempTodos);
      setInputValue("");
      fetch("https://assets.breatheco.de/apis/fake/todos/user/juanpinto", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tempTodos),
		})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log("console de la data");
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juanpinto", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodos),
		})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log("console de la data");
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});

  };
  useEffect(()=>{
    fetch("https://assets.breatheco.de/apis/fake/todos/user/juanpinto", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setTodos(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
  },[]);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <form>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        <button className="btn btn-success" onClick={handleAddTodo}>
          Agregar Tarea{" "}
        </button>
      </div>
      <div className="d-flex justify-content-center ">
        <table>
          <thead>
            <tr>
              <th>TAREAS</th>
              <th>| ELIMINAR </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.label}</td>
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
