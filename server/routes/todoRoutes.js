import express from 'express';

import { AddTodo, deleteAllTodos, deleteTodoById, getAllTodo,   updateTodoDetailsById, updateTodoDoneById } from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/add', AddTodo)
router.get('/todo', getAllTodo)
router.put('/update/:id', updateTodoDoneById);
router.put('/update/details/:id', updateTodoDetailsById);
router.delete('/delete', deleteAllTodos)

router.delete('/delete/:id', deleteTodoById);

export default router;