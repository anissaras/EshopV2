import cors from "cors";
import express from "express";
import articleRouter from "./Routers/article.router";
import userRouter from "./Routers/user.router";
//import oracledb from "oracledb";
//import * as fs from 'fs';
import authRouter from "./Routers/auth.router";
import bodyParser from "body-parser";
//oracledb.autoCommit = true;

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('', articleRouter);
app.use('/api/users', userRouter);
app.use('/api/user', authRouter)

// listen PORT
const port = 3000;
app.listen(port,()=>{
    console.log("listen to http://localhost:" + port)
})





