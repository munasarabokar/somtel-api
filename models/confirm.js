import db  from '../database/data.js'

const confirmTransection = (index) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
         const check_num = "SELECT * FROM macaamiil WHERE s_number = ?"
         const check_natiijo = "SELECT * FROM natiijo WHERE cos_id = ? AND xaalada = 'pending' ORDER BY id DESC"

         const update_natiijo = "UPDATE natiijo SET xaalada ='success' WHERE  id= ?"

         db.query(check_num , [index] , (err , nums) => {
            if(err) resolve(err)
            if (nums.length > 0) {
              db.query(check_natiijo , [nums[0].cid], (err , ntajjo) => {
                if(err) resolve(err)
                if (ntajjo.length > 0) {
                  db.query(update_natiijo , [ntajjo[0].id] , (err , update_done) => {
                    resolve('success')
                  })
                } else {
                  resolve('*301#')
                }
              })
            } else {
              resolve('*301#')
            }
         })
    }, 4000)
  });



export default confirmTransection