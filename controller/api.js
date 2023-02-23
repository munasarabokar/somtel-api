import db  from '../database/data.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import sendAll from '../models/send.js';
import confirmTransection from '../models/confirm.js';
dotenv.config()

// git config --global user.email "abdihalim415@gmail.com" 
//   git config --global user.name "Munasar Abuukar"
// get list all
export const get_tracker = (req , res ) => {
    // check if api is vali
  const find_key = "SELECT * FROM user_login WHERE  hexgen = ? ";
  // select query after api is getting
  const querys = "SELECT * FROM macaamiil WHERE  user_id = ? ORDER BY cid DESC";
  // params link insert via api mobile or web
  const value = [req.params.hex];
  // db query 
  db.query(find_key , value , (err , userdata ) => {
    if(err) res.status(500).json('err')
    if (userdata.length > 0) {
        res.status(200).json(userdata[0]);
       console.log('success');
    } else {
        res.status(200).json({massage : "hex not found yet.."});
        console.log('not found');
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
    const sender = req.body.sender;
    // check if api is valiD
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
          }
        } else {
            res.json('banned');
        }
        
       
   } else {
       res.json("invalid");
   }
 });
  
}

export const check = (req , res) => {
    //  const check = 'SELECT SUM(qiimaha) as day FROM natiijo WHERE created_at > CURDATE() AND user_id = "2" AND xaalada = "success"';
    // db.query(check, (err , ress) => {
    //    if (ress.length > 0) {
    //     res.json(ress);
    //    } else {
    //     res.json('not found');
    //    }
    // })

    
}
export const Postcheck = (req , res) => {
  
    const sender = req.body.sender;
    const massage_body = req.body.list

    const number  = massage_body.replace(/[^0-9\.]+/g, ",");
    var n_arr = []
    const words = number.split(",")
    words.forEach(counts)
    function counts(count) {
      n_arr.push({ count })
    }
    const balance = n_arr[4].count
    const numbers = n_arr[1].count
  
   res.json(n_arr[4].count)
}