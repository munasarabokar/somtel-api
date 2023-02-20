import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db  from '../database/data.js'
import hexgen from 'hex-generator' 

export const register = (req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM user_login WHERE user_name = ?";
     const hex = hexgen(128)
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO user_login (`user_name`,`user_password` , `hexgen`  , `resseler_name` , `counts`) VALUES (?)";
      const values = [req.body.username,  hash , hex  , 'Munasar' , '7' ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  };


  export const login = (req, res) => {
    //CHECK USER
  
    const q = "SELECT * FROM user_login WHERE user_name = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].user_password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
  
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  };