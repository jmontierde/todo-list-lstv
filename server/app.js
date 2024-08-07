import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes.js'
import cors from "cors"

const app = express();

dotenv.config({path: './config/config.env'})

app.listen(process.env.port, () => { 
    console.log(`Listen on port ${process.env.port}`);
})

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
}));

app.use(bodyParser.json());
app.use(express.json());
app.use("/api",  todoRoutes)

export default app;

