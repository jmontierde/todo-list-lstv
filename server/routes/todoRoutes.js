import express from 'express';

import { AddTodo, deleteTodoById, getAllTodo,  updateTodoById } from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/add', AddTodo)
router.get('/todo', getAllTodo)
router.put('/update/:id', updateTodoById);
router.delete('/delete/:id', deleteTodoById);

export default router;