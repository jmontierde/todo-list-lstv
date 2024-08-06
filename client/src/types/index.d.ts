interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
  }
  
export interface TodoStore {
    todos: Todo[]; 
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (updatedTodo: Todo) => void;
    deleteTodo: (id: number) => void;
  }
  
