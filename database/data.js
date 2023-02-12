import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import mysql from 'mysql';

const connection = mysql.createConnection({
  host:process.env.HOST,
  database:process.env.DB,
  user: process.env.USER,
  password: process.env.PASS ,
  multipleStatements: true
});


connection.connect(function(error){
   if(error) {
    console.log('Mysql is working not good'); 
   } else {
    console.log('Mysql is working good');
   } 
});

export default  connection;