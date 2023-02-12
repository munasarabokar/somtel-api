import db  from '../database/data.js'
function sendAll (index) {
    const select  =  `SELECT * FROM macaamiil WHERE h_number = ${index}`;
    db.query(select , (err , respon) => {
      if(err) res.send({massage: err });
        if (respon.length > 0) {
            return 'data'
        } else {
            return 'not found'
        }
    })
}

export default sendAll