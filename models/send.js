import db  from '../database/data.js'

const sendAll = (index, pin , user_id , amounts) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
     
      const select_amount  =  `SELECT * FROM doorashada WHERE a_r = ${amounts}`;
      const select  =  `SELECT * FROM macaamiil WHERE h_number = ${index}`;
      const select_type  =  "SELECT * FROM types WHERE types = ?";
      const insert_natiijo = "INSERT INTO natiijo (user_id, cos_id, magaca , h_number , s_number , amount  , xaalada) VALUES (? , ? , ? , ? , ? , ? , ?)"
      db.query(select_amount , (err , resamont) => {
        if(err)  resolve(err);
          if (resamont.length > 0) {
             if (resamont[0].xaalada == 'active') {
              db.query(select , (err , resp ) => {
                if(err)  resolve(err);
                if (resp.length > 0) {
                  db.query(select_type , [resp[0].types] , (err , send_data ) => {
                   if(err) resolve(err)
                   if(send_data.length > 0) {
                    const data =   `${send_data[0].starts}${resp[0].s_number}*${resamont[0].a_s}*${pin}#`;
                     const natiijo_val = [user_id ,resp[0].cid   ,resp[0].name  ,resp[0].h_number  ,resp[0].s_number , amounts , 'pending'];
                     if(resp[0].xaalada == 'active') {
                      db.query(insert_natiijo , natiijo_val , (err , natiijosucc) => {
                        if(err) resolve(err)
                        resolve(data);
                      })
                     } else {
                      resolve('false')
                     }
                   } else {
                    resolve('false')
                   }
                  })
               
                } else {
                  resolve('false');
                }
              })
             } else {
              resolve('false');
             }
             
          } else {
            resolve('false');
          }
      });
    }, 4000)
  });

//Munasar, waxaad ku guulaysatay inaad lambarkan 629346050 u wareejiso  1.00 oo Dhammays ah. Haraagaagu waa:  9.00. Mahadsanid!

export default sendAll