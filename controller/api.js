import db  from '../database/data.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// git config --global user.email "munasarabokar@gmail.com"
//git config --global user.name "Munasar abuukar"

export const get_tracker = (req , res ) => {
    // check if api is vali
  const find_key = "SELECT * FROM api WHERE  api_key = ? ";
  // select query after api is getting
  const querys = "SELECT * FROM macaamiil WHERE  user_id = ? ORDER BY cid DESC";
  // params link insert via api mobile or web
  const value = [req.params.link];
  // db query 
  db.query(find_key , value , (err , find_keys ) => {
    if(err) res.send({massage: err });
    if (find_keys.length > 0) {
        db.query(querys , [find_keys[0].user_id] , (err , resss) => {
            if(err) res.send({massage: err });
            if (resss.length > 0) {
                res.send({massage : resss})
            }
        })
    } else {
        res.send({massage : "api key not valid"});
    }
  });
}

export const add_tracker = (req , res ) => {
     // check if api is vali
  const find_key = "SELECT * FROM api WHERE  api_key = ? ";
  // select query after api is getting
  const insert = "INSERT INTO `macaamiil` (`user_id`, `name`, `h_number`, `s_number`) VALUES (?, ?, ?, ?);";
  // params link insert via api mobile or web
  const value = [req.params.link];
  // db query 
  db.query(find_key , value , (err , find_keys ) => {
    if(err) res.send({massage: err });
    if (find_keys.length > 0) {
        const adding = [find_keys[0].user_id , req.body.name , req.body.hor , req.body.som ];
        //res.send({massage : adding})
        db.query(insert , adding , (err , resss) => {
            if(err) res.send({massage: err });
            
                res.send({massage : "success"})
            
        })
    } else {
        res.send({massage : "api key not valid"});
    }
  });
   
}

export const delete_tracking = (req , res ) => {
       // check if api is vali
  const find_key = "SELECT * FROM api WHERE  api_key = ? ";
  // select query after api is getting
  const querys = "DELETE FROM macaamiil WHERE  `cid`= ? AND user_id = ?";
  // params link insert via api mobile or web
  const value = [req.params.link];
 
  // db query 
  db.query(find_key , value , (err , find_keys ) => {
    if(err) res.send({massage: err });
    if (find_keys.length > 0) {
        const id = [req.params.id , find_keys[0].user_id];
        db.query(querys , id , (err , resss) => {
            if(err) res.send({massage: err });
                res.send({massage : "deleted success   ....."})
        })
    } else {
        res.send({massage : "api key not valid"});
    }
  });
   
}

export const update_tracking = (req , res ) => {
    // check if api is vali
const find_key = "SELECT * FROM api WHERE  api_key = ? ";
// select query after api is getting
const querys = "UPDATE macaamiil SET name = ? , h_number = ? , s_number = ?  WHERE cid = ?";
// params link insert via api mobile or web
const value = [req.params.link];

// db query 
db.query(find_key , value , (err , find_keys ) => {
 if(err) res.send({massage: err });
 if (find_keys.length > 0) {
    const id = [ req.body.name , req.body.hor , req.body.som, req.params.id ];
     db.query(querys , id , (err , resss) => {
         if(err) res.send({massage: err });
             res.send({massage : "updated success   ....."})
     })
 } else {
     res.send({massage : "api key not valid"});
 }
});

}
