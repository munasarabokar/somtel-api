const { Device } = require('../models/check.js');
const { gettingNotification } = require('../models/notifications.js');
const { sender } = require('../models/sender.js');



const send_tracker = async (req , res ) => {
  sender(req.params.deviceid , req.body).then((r) => {
    res.json(r)
  })
}

const gets_tracker = async (req , res ) => {
   const g = await gettingNotification(req.params.deviceid)
   if(g.msg) res.status(409).json('false')
   else res.status(200).json(g)
     
}

const getInfo = (req , res) => {
  Device(req.params.deviceid).then((r) => {
    if(r == 'not') {res.status(409).json('false')} else {
        res.status(200).json(r)
    }
  
  })
}

// const gets_tracker = (req , res ) => {
//   const find_key = "SELECT * FROM user_login WHERE  deviceid = ? ";
//   const find_send = "SELECT * FROM send_now WHERE  user_id = ? ";
//   const updates = "UPDATE send_now SET xaalada = 'success WHERE  id= ?"
//   const find_activty = "SELECT * FROM natiijo WHERE  h_number = ?  ORDER BY id DESC";
//  const value = [req.params.link];
//   db.query(find_key , value , (err , userdata) => {
//        if(err) res.status(500).json(err);
//        if(userdata.length === 0) res.status(409).json('invalid')
//        db.query(find_send , [userdata[0].user_id] , (err , cdata) => {
//         if(err) res.status(500).json(err);
//        if(cdata.length === 0) res.status(409).json('not found');
//         if(cdata[0].xaalada == 'pending') {
//           db.query(find_activty , [cdata[0].h_number] , (err , ndata) => {
//             if(err) res.status(500).json(err);
//            if(ndata.length === 0) res.status(409).json('not found');
//               if (ndata[0].xaalada == 'pending') {
//                 db.query(updates , [cdata[0].id] , (err , succdatas ) => {
//                   if(err) res.status(500).json(err);
//                   const sent = cdata[0].type+ndata[0].s_number+cdata[0].amount+userdata[0].pin
//                 })
//                 res.status(200).json(sent)
//               } else {
//                 res.status(200).json('false');
//               }
//            });
//         } else {
//           res.status(200).json('false');
//         }

//        });
//   })
// // res.json("Hi")
// }


module.exports = {
 send_tracker ,
  gets_tracker ,
  getInfo
}