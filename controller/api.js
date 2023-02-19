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
  const find_key = "SELECT * FROM api WHERE  email = ? ";
  // select query after api is getting
  const querys = "SELECT * FROM macaamiil WHERE  user_id = ? ORDER BY cid DESC";
  // params link insert via api mobile or web
  const value = [req.query.raadi];
  // db query 
  db.query(find_key , value , (err , find_keys ) => {
    if(err) res.status(500).json('err')
    if (find_keys.length > 0) {
        res.status(200).json(find_keys[0]);
       console.log('success');
    } else {
        res.status(200).json({massage : "not registered yet.."});
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
            const check_massage = 'SELECT * FROM amounts';
          db.query(check_massage , (err , check_amounts) => {
            if(err) res.json('false');
            
            if(sender == '192') {
                if (check_amounts[0].amount == massage_body.substring(
                    check_amounts[0].start_amount , 
                    check_amounts[0].end_amount
                    )) {
                   const numbers = massage_body.substring(
                    check_amounts[0].start_num , 
                    check_amounts[0].end_num
                    )
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id , check_amounts[0].amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                } else if (check_amounts[1].amount == massage_body.substring(
                    check_amounts[1].start_amount , 
                    check_amounts[1].end_amount
                    )) {
                    const numbers = massage_body.substring(
                    check_amounts[1].start_num , 
                    check_amounts[1].end_num
                    )
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id , check_amounts[1].amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                } else if (check_amounts[2].amount == massage_body.substring(
                    check_amounts[2].start_amount , 
                    check_amounts[2].end_amount
                    )) {
                    const numbers = massage_body.substring(
                    check_amounts[2].start_num , 
                    check_amounts[2].end_num
                    )
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id , check_amounts[2].amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                }else if (check_amounts[3].amount == massage_body.substring(
                    check_amounts[3].start_amount , 
                    check_amounts[3].end_amount
                    )) {
                    const numbers = massage_body.substring(
                    check_amounts[3].start_num , 
                    check_amounts[3].end_num
                    )
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id , check_amounts[3].amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                } else if (check_amounts[4].amount == massage_body.substring(
                    check_amounts[4].start_amount , 
                    check_amounts[4].end_amount
                    )) {
                    const numbers = massage_body.substring(
                    check_amounts[4].start_num , 
                    check_amounts[4].end_num)
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id , check_amounts[4].amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                } else if (check_amounts[5].amount == massage_body.substring(
                    check_amounts[5].start_amount , 
                    check_amounts[5].end_amount
                    )) {
                    const numbers = massage_body.substring(
                    check_amounts[5].start_num , 
                    check_amounts[5].end_num
                    )
                    sendAll(numbers, find_keys[0].pin, find_keys[0].user_id , check_amounts[5].amount).then(result => {
                        /* process */
                    res.json(result)
                    });
                } else  {
                    res.json('false')
                }
            } else if (sender == 'Reseller') {
                if(find_keys[0].resseler_name == massage_body.substring(0 ,find_keys[0].counts)) {
                    const start = find_keys[0].counts+40;
                    const end = find_keys[0].counts+49;
                    confirmTransection(massage_body.substring(start, end)).then(result => {
                        res.json(result)
                    })
                }
            }   else {
                res.json('false');
            }
          })
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
  
    // const massage_sender = req.body.sender;
    // const massage_body = req.body.list

    

    
}