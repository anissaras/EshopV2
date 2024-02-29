import oracledb from "oracledb";
//connection database
async function checkConnection() {
try {
    let connection = await oracledb.getConnection({
        user: "eshop",
        password: "eshoppw",
        connectString: "ORCL"
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err);
  } 
}

checkConnection();
