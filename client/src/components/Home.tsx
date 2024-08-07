import React, { useState } from "react";
import TodoList from "./TodoList";
import { Button, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useTodoStore from "../stores/useTodoStore";
import { createTodo } from "../api/todoApi";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();
  const addTodo = useTodoStore((state) => state.addTodo);

  const mutation = useMutation({
    mutationFn: () => createTodo(title, description),
    onSuccess: (newTodo) => {
      addTodo(newTodo);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>

      <TodoList />
    </div>
  );
};

export default Home;
