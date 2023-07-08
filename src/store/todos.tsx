'use client'

import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
  id: string;
  task: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string, description: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  updateTodoTask: (id: string, task: string) => void; // New function to update the task
  updateTodoDescription: (id: string, description: string) => void; // New function to update the description
};

export const todosContext = createContext<TodosContext | undefined>(undefined);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      return [];
    }
  });

  const handleAddTodo = (task: string, description: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      task,
      description,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    updateLocalStorage([...todos, newTodo]);
  };

  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodoTask = (id: string, task: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task } : todo
      )
    );
  };

  const updateTodoDescription = (id: string, description: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description } : todo
      )
    );
  };

  const updateLocalStorage = (updatedTodos: Todo[]) => {
    try {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error updating todos in localStorage:", error);
    }
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        handleAddTodo,
        toggleTodoAsCompleted,
        handleDeleteTodo,
        updateTodoTask,
        updateTodoDescription,
      }}
    >
      {children}
    </todosContext.Provider>
  );
}

export function useTodos() {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error("useTodos used outside of TodosProvider");
  }
  return todosContextValue;
}
