import { create } from "zustand";
// import { TodoStore } from "./types";
import { TodoStore } from "./types";
// interface Todo {
//     id: number;
//     title: string;
//     description: string;
//     done: boolean;
//   }
  
//   interface TodoStore {
//     todos: Todo[]; 
//     setTodos: (todos: Todo[]) => void;
//     addTodo: (todo: Todo) => void;
//     updateTodo: (updatedTodo: Todo) => void;
//     deleteTodo: (id: number) => void;
//   }
  

const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    updateTodo: (updatedTodo) => set((state) => ({
      todos: state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    })),
    deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  }));




export default useTodoStore;