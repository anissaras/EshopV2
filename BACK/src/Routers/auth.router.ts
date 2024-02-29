import oracledb, { connectionClass } from "oracledb";
oracledb.autoCommit = true;

import * as fs from 'fs';
import jwt from "jsonwebtoken";

import { Router } from "express";
const router = Router();
//register
router.post('/register', (req,res)=>{
  async function fetchDataArticles(){
    try{
      const {email,password, nom, prenom, adresse} = req.body;
      const connection = await oracledb.getConnection({ user: "eshop", password: "eshoppw", connectionString: "ORCL" });  
      const result = await connection.execute(
          `INSERT INTO Tusers values(:email, :password,:nom,:prenom,:adresse)`,
          [email, password,nom, prenom,adresse]
        ); 
        console.log("REGISTER OK: " + result.rowsAffected);
     await connection.close();
    }catch(error){
      return error;
  }
}
fetchDataArticles().then(dbRes =>{console.log(dbRes) })
  .catch(err=>{
    res.send(err)
  })
})
 
//LOGIN
router.post('/login', async function (req, res) {
  try {
      const {email,password} = req.body;
      const connection = await oracledb.getConnection({ user: "eshop", password: "eshoppw", connectionString: "ORCL" });
      if(connection)console.log('connected db');
      const result = await connection.execute("SELECT * from Tusers where email = :email and password = :password" , [req.body.email, req.body.password], { outFormat: oracledb.OUT_FORMAT_OBJECT });
      /*fs.writeFile("login.json", JSON.stringify(result.rows), err => {
          if (err) throw err;
          console.log('login write file OK');
      });*/
      if(result.rows?.length ==1)
      res.send(generateTokenResponse((result.rows)));
      else{
        res.status(404).send('invalid username or password');
        return;
    } 
  } catch (err) {
      console.log(err);
  }});
  
  //generation de TOKEN
  const generateTokenResponse = (user:any)=>{
    const token = jwt.sign(
        {email: user.email, isAdmin: user.isAdmin},
        "SomeRandomText", 
        { expiresIn:"30d"});
user.token = token;
return user; 
}


//Order
router.post('/order', (req,res)=>{
  async function fetchDataOrder(){
    try{
      const {C_Nom,C_Num, C_Exp, C_Cvv,subTotal, totalPrice,C_Status} = req.body;
      const connection = await oracledb.getConnection({ user: "eshop", password: "eshoppw", connectionString: "ORCL" });  
      const result = await connection.execute(
          `INSERT INTO Torder values(:C_Nom,:C_Num,:C_Exp,:C_Cvv,:subTotal,:totalPrice,:C_Status)`,
          [C_Nom,C_Num, C_Exp, C_Cvv,subTotal, totalPrice,C_Status]
        ); 
        console.log("Order OK: " + result.rowsAffected);
     await connection.close();
    }catch(error){
      return error;
  }
}
fetchDataOrder().then(dbRes =>{console.log("resultat:",dbRes) })
  .catch(err=>{
    res.send(err)
  })
})
export default router;
