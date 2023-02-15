import db  from '../database/data.js'

const sendAll = (index, pin , amounts) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
     
      const select_amount  =  `SELECT * FROM doorashada WHERE a_r = ${amounts}`;
      const select  =  `SELECT * FROM macaamiil WHERE h_number = ${index}`;
      const select_type  =  "SELECT * FROM types WHERE types = ?";
      db.query(select_amount , (err , resamont) => {
        if(err)  resolve(err);
          if (resamont.length > 0) {
             if (resamont[0].xaalada == 'active') {
              db.query(select , (err , resp ) => {
                if(err)  resolve(err);
                if (resp.length > 0) {
                 // resolve(resp)
                  db.query(select_type , [resp[0].types] , (err , send_data ) => {
                   if(err) resolve(err)
                   if(send_data.length > 0) {
                    const data =   `${send_data[0].starts}${resp[0].s_number}*${resamont[0].a_s}*${pin}#`;
                    resolve(data);
                   } else {
                    resolve('*301#')
                   }
                  })
               
                } else {
                  resolve('*301#');
                }
              })
             } else {
              resolve('*301#');
             }
             
          } else {
            resolve('*301#');
          }
      });
    }, 4000)
  });



export default sendAll