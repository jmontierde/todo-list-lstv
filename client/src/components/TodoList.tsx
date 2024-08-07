import React from "react";
import { useQuery } from "@tanstack/react-query";
// import useTodoStore from "../stores/useTodoStore";
import { fetchTodos } from "../api/todoApi";
import { Todo } from "../api/todoApi";

type TodoProps = {
  todo: Todo;
};

const TodoList = ({ todo }: TodoProps) => {
  //   const setTodos = useTodoStore((state) => state.setTodos);

  // Correct useQuery usage with options object
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo.id}>
          <strong>{todo.title}</strong>
          <p>{todo.description}</p>
          <small>{new Date(todo.create_at).toLocaleDateString()}</small>
          <p>{todo.done ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
