// src/api/todoApi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export interface Todo {
  id: number;
  title: string;
  description: string;
  create_at: string;
  done: boolean; // Ensure `done` is a boolean
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todo');
  return response.data;
};

export const createTodo = async (title: string, description: string): Promise<Todo> => {
  const response = await api.post('/add', { title, description, done: false });
  return response.data;
};

export const updateTodo = async (id: number, data: { title?: string; completed?: boolean }): Promise<Todo> => {
  const response = await api.put(`/todos/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
