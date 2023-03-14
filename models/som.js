const db = require('../database/data');
var jsonData = require('tzdata');
const { constFind, constUpdate, constInst } = require('./selector');



function checksNtijo(type) {
    return new Promise( async (resolve, reject) => {
        const select =  await constFind('')
        db.query(select.check_Send , [type] , (err , data ) => {
            if(err) resolve('err')
            if(data?.length >0 ) resolve(data[0])
            resolve('not')
        })
    })
}

function updateNtjjo(type) {
    return new Promise( async (resolve, reject) => {
        const select =  await constUpdate()
        db.query(select.update_natiijo , [type] , (err , data ) => {
            if(err) resolve('err')
           resolve('oke')
        })
    })
}

function updateBalence(user , balance) {
    return new Promise( async (resolve, reject) => {
        const select =  await constUpdate()
        db.query(select.update_balance , [balance , user ] , (err , data ) => {
            if(err) resolve('err')
           resolve('oke')
        })
    })
}


function somtel (users , macaamiil , telecom ) {
   return new Promise( async (resolve, reject) => {
        const timeZone =  process.env.TZ 
        const nowDate =  new Date();
        const checksN = await checksNtijo(macaamiil.cid)
        if(checksN == 'not') {
            const value = [ users.user_id , macaamiil.cid , macaamiil.name , macaamiil.h_number , macaamiil.s_number , macaamiil.types , telecom[10].t , 'success' , nowDate ]
            resolve({msg: "oke" , value: value })
        } else {
           await updateNtjjo(checksN.id)
           await updateBalence(users.user_id , telecom[17].t)
           resolve({msg : "oke"})
        }
        
   })
}
module.exports = {
    somtel,
    updateBalence
}