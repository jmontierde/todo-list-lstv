import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  updateDetailsTodo,
  deleteTodo,
  Todo,
} from "../api/todoApi";
import { updateTodoDone } from "../api/todoApi";
import useTodoStore from "../stores/useTodoStore";
import { Button } from "@mui/material";

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const updateTodoInStore = useTodoStore((state) => state.updateTodo);
  const removeTodoFromStore = useTodoStore((state) => state.removeTodo);

  const { data: todos, isLoading } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const mutationUpdate = useMutation({
    mutationFn: (todo: Todo) =>
      updateDetailsTodo(todo.id, {
        title: todo.title,
        description: todo.description,
      }),
    onSuccess: (updateDetailsTodo) => {
      updateTodoInStore(updateDetailsTodo);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const mutationUpdateDone = useMutation({
    mutationFn: (id: number, done: boolean) => updateTodoDone(id, { done }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: (_, id) => {
      removeTodoFromStore(id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleUpdate = (todo: Todo) => {
    const updateDetailsTodo = {
      ...todo,
      title: prompt("Enter new title:", todo.title) || todo.title,
      description:
        prompt("Enter new description:", todo.description) || todo.description,
    };
    mutationUpdate.mutate(updateDetailsTodo);
  };

  const handleUpdateDone = (id: number, done: boolean) => {
    mutationUpdateDone.mutate(id, !done);
  };

  const handleDelete = (id: number) => {
    mutationDelete.mutate(id);
  };

  return (
    <div>
      {todos?.map((todo) => (
        <div key={todo.id}>
          <strong>{todo.title}</strong>
          <p>{todo.description}</p>
          <small>{new Date(todo.create_at).toLocaleDateString()}</small>
          <p>{todo.done ? "Completed" : "Not Completed"}</p>
          <Button onClick={() => handleUpdate(todo)}>Update Details</Button>
          <Button onClick={() => handleUpdateDone(todo.id, todo.done)}>
            Update Done
          </Button>

          <Button onClick={() => handleDelete(todo.id)} color="error">
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
