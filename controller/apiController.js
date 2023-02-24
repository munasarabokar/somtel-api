import db  from '../database/data.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import sendAll from '../models/send.js';
import confirmTransection from '../models/confirm.js';
dotenv.config()



//get statics 
export const get_data = (req , res ) => {
  const find_key = "SELECT * FROM user_login WHERE  hexgen = ? ";
  const querys = "SELECT * FROM macaamiil WHERE  user_id = ? ORDER BY cid DESC";
  const value = [req.params.hex];
  db.query(find_key , value , (err , userdata ) => {
    if (err) return res.status(500).json(err);
    if (userdata.length === 0) return res.status(404).json("User not found!");
    return res.status(200).json(userdata)
  });
}


// list all data
export const get_tracker = (req , res ) => {
  const find_key = "SELECT * FROM user_login WHERE  hexgen = ? ";
  const querys = "SELECT * FROM macaamiil WHERE  user_id = ? ORDER BY cid DESC";
  const value = [req.params.hex];
  db.query(find_key , value , (err , userdata ) => {
    if (err) return res.status(500).json(err);
    if (userdata.length === 0) return res.status(404).json("User not found!");
     db.query(querys , [userdata[0].user_id]  , (err , macaamiilData) => {
      if (err) return res.status(500).json(err);
      if (macaamiilData.length === 0) return res.status(404).json("not found!");
      return res.status(200).json(macaamiilData)
     })
  });
}


// add users
export const add_tracker = (req , res ) => {
  const find_key = "SELECT * FROM user_login WHERE  hexgen = ? ";
  const insert = "INSERT INTO `macaamiil` (`user_id`, `name`, `h_number`, `s_number` , `types` ) VALUES (?, ?, ?, ? , ? );";
  const value = [req.params.link];
  // db query 
  db.query(find_key , value , (err , userdata ) => {
    if (err) return res.status(500).json(err);
    if (userdata.length === 0) return res.status(404).json("User not found!");
        const adding = [userdata[0].user_id , req.body.name , req.body.hor , req.body.som ,  req.body.type ];
        //res.send({massage : adding})
        db.query(insert , adding , (err , resss) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({massage : "success"})
        })
   
  });
   
}
// delete
export const delete_tracking = (req , res ) => {
  const find_key = "SELECT * FROM user_login WHERE  hexgen = ? ";
  const querys = "DELETE FROM macaamiil WHERE  `cid`= ? AND user_id = ?";
  const value = [req.params.link];
  // db query 
  db.query(find_key , value , (err , userdata ) => {
    if (err) return res.status(500).json(err);
    if (userdata.length === 0) return res.status(404).json("User not found!");
        const id = [req.params.id , userdata[0].user_id];
        db.query(querys , id , (err , resss) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({massage : "deleted success"})
        })
    
  });
   
}
// edit tracking
export const update_tracking = (req , res ) => {
  const find_key = "SELECT * FROM user_login WHERE  hexgen = ? ";
// select query after api is getting
const querys = "UPDATE macaamiil SET name = ? , h_number = ? , s_number = ? , types = ?  , xaalada = ? WHERE cid = ?";
// params link insert via api mobile or web
const value = [req.params.link];

// db query 
db.query(find_key , value , (err , userdata ) => {
  if (err) return res.status(500).json(err);
    if (userdata.length === 0) return res.status(404).json("User not found!");
    const id = [ req.body.name , req.body.h_number , req.body.s_number, req.body.types , req.body.xaalada , req.params.id ];
     db.query(querys , id , (err , resss) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({massage : "updated success ..."})
     })

});

}

// send tracking


export const send_tracker = (req , res ) => {
    // massage body
    const massage_body = req.body.list;
    const sender = req.body.senderD
 const find_key = "SELECT * FROM api WHERE  api_key = ? ";
 const value = [req.params.link];
 // db query 
 db.query(find_key , value , (err , find_keys ) => {
    const numbers = '';
    const check = '';
   if(err) res.json('false');
   if (find_keys.length > 0  ) { 
        // check if 
        if(find_keys[0].xaalada == 'active') {
          if (sender == '192') {
            const number  = massage_body.replace(/[^0-9\.]+/g, ",");
            var n_arr = []
            const words = number.split(",")
            words.forEach(counts)
            function counts(count) {
              n_arr.push({ count })
            }
            const check_massage = 'SELECT * FROM amounts WHERE amount = ?';
            db.query(check_massage , [n_arr[1].count]+' ' , (err , ress ) => {
                if(err) res.status(500).json(err);
                if (ress.length > 0) {
                    const amount = n_arr[1].count;
                    const numbers = n_arr[2].count.substring(1)
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id ,amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                     
                } else {
                    res.json('false')
                }
               
            })
          } else if (sender == 'Reseller') {
            const number  = massage_body.replace(/[^0-9\.]+/g, ",");
                var n_arr = []
                const words = number.split(",")
                words.forEach(counts)
                function counts(count) {
                n_arr.push({ count })
                }
                const balance = n_arr[4].count
                const numbers = n_arr[1].count
                confirmTransection(numbers, find_keys[0].user_id , balance).then(result => {
                    /* process */
                            res.json(result)
                    
                    })
                // res.json(n_arr)
          } else {
            res.json('false')
          }
        } else {
            res.json('banned');
        }
        
       
   } else {
       res.json("invalid");
   }
 });
  
}
