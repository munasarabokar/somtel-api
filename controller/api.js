import db  from '../database/data.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import sendAll from '../models/send.js';
dotenv.config()


// get list all
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
// add users
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
// delete
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
// edit tracking
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

// send tracking


export const send_tracker = (req , res ) => {
    // massage body
    const massage_body = req.body.list;
    const one = "1 ";
    // check if api is vali
 const find_key = "SELECT * FROM api WHERE  api_key = ? ";
 const value = [req.params.link];
 // db query 
 db.query(find_key , value , (err , find_keys ) => {
    const numbers = 'false';
    const check = '';
   if(err) res.send({massage: err });
   if (find_keys.length > 0) { 
                    // check if 
        if (0.5 == massage_body.substring(20, 23)) {
            const numbers = massage_body.substring(35, 44);
            const select  =  `SELECT * FROM macaamiil WHERE h_number = ${numbers}`;
            db.query(select , (err , respon) => {
              if(err) res.send({massage: err });
                if (respon.length > 0) {
                    const send_now = `*831*${respon[0].s_number}*05*4683#`;
                    res.json(send_now)
                } else {
                    res.json('')
                }
            })
        } else if ("1 " == massage_body.substring(20, 22)) {
            const numbers = massage_body.substring(33, 42)
            const select  =  `SELECT * FROM macaamiil WHERE h_number = ${numbers}`;
            db.query(select , (err , respon) => {
              if(err) res.send({massage: err });
                if (respon.length > 0) {
                    const send_now = `*831*${respon[0].s_number}*1*4683#`;
                    res.json(send_now)
                } else {
                    res.json('')
                }
            })
        } else if (2.5 == massage_body.substring(20, 23)) {
            const numbers = massage_body.substring(35, 44)
            const select  =  `SELECT * FROM macaamiil WHERE h_number = ${numbers}`;
            db.query(select , (err , respon) => {
              if(err) res.send({massage: err });
                if (respon.length > 0) {
                    const send_now = `*831*${respon[0].s_number}*2*5#`;
                    res.json(send_now)
                } else {
                    res.json('')
                }
            })
        } else {
            res.json('')
        }

   } else {
       res.send({massage : "api key not valid"});
   }
 });
  
}