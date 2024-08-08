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
  done: boolean; 
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todo');
  return response.data;
};

export const createTodo = async (title: string, description: string): Promise<Todo> => {
  const response = await api.post('/add', { title, description, done: false });
  return response.data;
};


export const updateDetailsTodo = async (id: number, data: { title: string; description: string; }): Promise<Todo> => {
    const response = await api.put(`/update/details/${id}`, data);
    return response.data;
  };

  
export const updateTodoDoneById = async (id: number, data: { done: boolean }): Promise<Todo> => {
    const response = await api.put(`/update/${id}`, data);
    return response.data;
  };


  export const deleteTodo = async (id: number): Promise<void> => {
    await api.delete(`/delete/${id}`);
  };


  export const deleteTodos = async(): Promise<void> => { 
    await api.delete('/delete')
  }