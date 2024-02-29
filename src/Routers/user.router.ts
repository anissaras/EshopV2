import { Router } from "express";
const router = Router();
import { sample_users } from "../data/data_users";
import jwt from "jsonwebtoken";
//login
router.post('/login', (req,res)=>{
     const {email, password} =req.body;
     const user = sample_users.find(
         user => user.email ===email && 
         user.password === password);   
     if(user){
         res.send(generateTokenResponse(user));
     }else{
         res.status(404).send('invalid username or password');
         return;
     } 
 })
 //generate a token to know what user do what things
 
 const generateTokenResponse = (user:any)=>{
     const token = jwt.sign(
         {email: user.email, isAdmin: user.isAdmin},
         "SomeRandomText", 
         { expiresIn:"30d"});
 user.token = token;
 return user; 
 }

export default router;
