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


export const updateTodoDetailsById = async(req, res) => { 
    const {title, description} = req.body; 

    const query = 'UPDATE todos SET title = ?, description = ? WHERE id = ?'; 

    con.query(query, [title, description, req.params.id], (err, result) => { 
        if(err){ 
            console.log(err);
            res.status(500).json({message: 'An error occurred'})
        }else{ 
            res.json({message: 'Update Details Successfully'})
        }
    })
}


export const updateTodoDoneById = async (req, res) => {
    const { done } = req.body;
    const query = 'UPDATE todos SET done = ? WHERE id = ?'; 

    const doneValue = done ? 1 : 0;

    // con.query(query, [doneValue, req.params.id], (err, result) => { 
    //     if (err) {
    //         console.error(err);
    //         res.status(500).json({ message: 'An error occurred' });
    //     } else {
    //         res.json({ message: 'Updated Successfully' });
    //     }
    // });
    con.query(query, [done, req.params.id], (err, result) => { 
        if (err) throw err;  
        res.json({ message: 'Updated Successfully' });
    });
};

export const deleteTodoById = async(req, res) => { 
    const query = 'DELETE FROM todos WHERE id = ?'
    con.query(query, [req.params.id], (err, result) => { 
        if(err) throw err; 
        res.json({message: 'Deleted Successfully'});
    })
} 