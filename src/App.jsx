import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./Contexts";
import TodoItemImp from "./Components/TodoItemImp";
import Todoform from "./Components/Todoform";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((previousElements) => [
      { id: Date.now(), ...todo },
      ...previousElements,
    ]);
  };

  const updateTodo = (id, newtodo) => {
    setTodos((previousElements) =>
      previousElements.map((eachTodo) =>
        eachTodo.id === id ? newtodo : eachTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((previousElements) =>
      previousElements.filter((eachElement) => eachElement.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setTodos((previousElements) =>
      previousElements.map((eachElement) =>
        eachElement.id === id
          ? { ...previousElements, completed: !previousElements.completed }
          : previousElements
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {console.log("Reaching")}

            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItemImp todo={todo} />
                {console.log("Reaching")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
