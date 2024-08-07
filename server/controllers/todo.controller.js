import axios from 'axios';
import con from '../config/db.js'



export const AddTodo = async (req, res) => { 
        const { title, description } = req.body; 

        const query = 'INSERT INTO todos (title, description) VALUES (?, ? )';

        con.query(query, [title, description], (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, title, description });
        });
}

export const getAllTodo = (req, res) => {
    const query = 'SELECT * FROM todos';
    con.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
};


export const updateTodoById = async(req, res) => {
    const { title, description } = req.body;
    const query = 'UPDATE todos SET title = ?, description = ? WHERE id = ?'; 
    
    con.query(query, [ title, description, req.params.id], (err, result) => { 
        if(err) throw err;  
        res.json({message: 'Updated Successfully'});
    })
}

export const deleteTodoById = async(req, res) => { 
    const query = 'DELETE FROM todos WHERE id = ?'
    con.query(query, [req.params.id], (err, result) => { 
        if(err) throw err; 
        res.json({message: 'Deleted Successfully'});
    })
} 