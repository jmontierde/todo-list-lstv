import { create } from 'zustand';

interface Todo {
    id: number;
    title: string;
    description: string;
    create_at: string;
    done: boolean;
}

interface TodoStore {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    updateTodo: (updatedTodo) => set((state) => ({
        todos: state.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        ),
    })),
    removeTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useTodoStore;
