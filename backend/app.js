import express from "express";
import cors from "cors";



const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(express.urlencoded({ extended: true }));


export  { app };