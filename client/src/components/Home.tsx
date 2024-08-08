import React, { useState } from "react";
import TodoList from "./TodoList";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTodoStore from "../stores/useTodoStore";
import { createTodo } from "../api/todoApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add To Do List
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            height: 250,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: "12px" }}
            >
              ADD TO DO LIST
            </Typography>

            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: "12px", mr: "12px" }}
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
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
      {/* <button onClick={() => setOpenModal(!openModal)}>Open Modal</button>

      {openModal && (
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
      )} */}

      {/* <ModalForm/> */}
      <TodoList />
    </div>
  );
};

export default Home;
