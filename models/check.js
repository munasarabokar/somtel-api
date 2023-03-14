const db = require('../database/data')
const { constFind } = require('./selector')
const { findCostumers } = require('./sender')
function Device(device) {
    return new Promise(async (resolve, reject) => {
        const select = await constFind('no')
        db.query(select.deviceSelector , [device] , (err , data ) => {
            if(err) resolve('err')
            if(data?.length > 0 ) { 
                resolve(data[0])
            } else {
                    resolve("not")
            }
        })
    })
}

function checkSend(device) {
    return new Promise(async (resolve, reject) => {
        const select = await constFind('no')
        db.query(select.find_send , device , async (err , data) => {
            if(err) resolve({msg : err})
            if (data?.length > 0) {
               const macaamiil = await findCostumers(data[0].macamiil_id , device , `cid`)
               if(macaamiil == 'not') resolve('nots')
               resolve({checks : data[0] , macaamiil:macaamiil})
            } else {
              resolve({msg : "notz"})
            }
        })
    })
}

module.exports = {
    Device , 
    checkSend
}