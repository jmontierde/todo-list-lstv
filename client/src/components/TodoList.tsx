import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  updateDetailsTodo,
  deleteTodo,
  Todo,
  updateTodoDoneById,
} from "../api/todoApi";
import useTodoStore from "../stores/useTodoStore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
} from "@mui/x-data-grid";

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
    onSuccess: (updatedTodo) => {
      updateTodoInStore(updatedTodo);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const mutationUpdateDone = useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      updateTodoDoneById(id, { done }),
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

  const [open, setOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleClickOpen = (id: number) => {
    setSelectedTodoId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTodoId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedTodoId !== null) {
      mutationDelete.mutate(selectedTodoId);
      handleClose();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleUpdateDone = (id: number, done: boolean) => {
    mutationUpdateDone.mutate({ id, done: !done });
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    // Ensure newRow matches the Todo type
    const updatedTodo: Todo = {
      id: newRow.id as number,
      title: newRow.title as string,
      description: newRow.description as string,
      create_at: newRow.create_at as string,
      done: newRow.done as boolean,
    };

    mutationUpdate.mutate(updatedTodo);
    return updatedTodo;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: true,
    },
    {
      field: "create_at",
      headerName: "Created At",
      width: 150,
      valueFormatter: ({ value }) =>
        new Intl.DateTimeFormat("fr-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(value),
    },
    {
      field: "done",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <span>{params.value ? "Completed" : "Not Completed"}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      renderCell: (params: GridRenderCellParams<Todo>) => (
        <div>
          <Button
            onClick={() => handleUpdateDone(params.row.id, params.row.done)}
          >
            {params.row.done ? "Not Done" : "Update Done"}
          </Button>
          <Button onClick={() => handleClickOpen(params.row.id)} color="error">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const rows = todos?.map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    create_at: todo.create_at,
    done: todo.done,
  }));

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        processRowUpdate={processRowUpdate}
        // experimentalFeatures={{ newEditingApi: true }}
      />
      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
