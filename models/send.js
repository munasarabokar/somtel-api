import db  from '../database/data.js'

const sendAll = (index, amounts) =>
  new Promise((resolve, reject) => {
    const select  =  `SELECT * FROM macaamiil WHERE h_number = ${index}`;
    db.query(select , (err , respon) => {
        if(err) return err
            if (respon.length > 0) {
                const data =   `*831*${respon[0].s_number}*${amounts}*4683#`;
                resolve(data);
            } else {
            resolve("");
            }
        })
  });



export default sendAll