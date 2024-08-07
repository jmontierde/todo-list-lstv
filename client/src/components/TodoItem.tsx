import React from "react";
import useTodoStore from "../stores/useTodoStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo, deleteTodo } from "../api/todoApi";

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const updateMutation = useMutation(updateTodo, {
    onSuccess: (updatedTodo) => {
      useTodoStore.getState().updateTodo(updatedTodo);
    },
  });
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      useTodoStore.getState().removeTodo(id);
    },
  });

  const toggleCompletion = () => {
    updateMutation.mutate({ id, completed: !completed });
  };

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={toggleCompletion} />
      <span>{title}</span>
      <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
