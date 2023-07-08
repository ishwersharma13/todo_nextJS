'use client'
import { useState } from "react";
import { useTodos } from "@/store/todos";

const AddTodo = (): JSX.Element => {
  const { handleAddTodo } = useTodos();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleAddTodo(task, description);
    setTask("");
    setDescription("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Write your todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Add description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      ></textarea>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        ADD
      </button>
      <h2 className="mt-4">I am adding a todo</h2>
    </form>
  );
};

export default AddTodo;
