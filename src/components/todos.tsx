"use client"
import { useState } from "react";
import { useTodos } from "@/store/todos";
import { useSearchParams } from "next/navigation";

export const Todos = (): JSX.Element => {
  const {
    todos,
    toggleTodoAsCompleted,
    handleDeleteTodo,
    updateTodoTask,
    updateTodoDescription,
  } = useTodos();

  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");
  console.log("params " + todosFilter);

  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  let filteredTodos = todos;

  if (todosFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (todosFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  const handleEdit = (todoId: string, title: string, description: string) => {
    setEditingTodoId(todoId);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSave = (todoId: string) => {
    updateTodoTask(todoId, editedTitle);
    updateTodoDescription(todoId, editedDescription);
    setEditingTodoId(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleCancel = () => {
    setEditingTodoId(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  return (
    <ul className="main-task">
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          {editingTodoId === todo.id ? (
            <form onSubmit={() => handleSave(todo.id)}>
              <label htmlFor="editTask">Title</label>
              <input
                type="text"
                id="editTask"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <label htmlFor="editDescription">Description</label>
              <textarea
                id="editDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleTodoAsCompleted(todo.id)}
              />
              <label htmlFor={`todo-${todo.id}`}>
                <h1>Title: {todo.task}</h1>
              </label>
              <h3>Description: {todo.description}</h3>
              {todo.completed && (
                <button
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  handleEdit(todo.id, todo.task, todo.description)
                }
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
