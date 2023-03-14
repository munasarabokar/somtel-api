const db = require('../database/data');
var jsonData = require('tzdata');
const { constFind } = require('./selector');

function amountsCheck(amount) {
    return new Promise(async (resolve, reject) => {
        const amoutss = await constFind('no');
        db.query(amoutss.amoutss , [amount] , (err , data) => {
            if(err) resolve('err')
            if(data?.length >0 ) resolve(data[0])
            resolve('not')
           
        })
    })
}

function selecAmouts(amount) {
  return new Promise( async (resolve, reject) => {
    const select  =  await constFind('no');
    db.query(select.selectamounts , amount , (err , data ) => {
        if(err) resolve('err')
        if(data?.length > 0) {
                resolve(data[0])
        } else {
            resolve('not')
        }
      
    })
  })
}

function selectTypes(type) {
    return new Promise(async (resolve, reject) => {
        const select = await constFind(`types`)
        db.query(select.nooca , [type] , (err , data ) => {
            if(err) resolve('err')
            if(data?.length >0 ) resolve(data[0])
            resolve('not')
        })
    })
}


function hormuud (macaamiil , amount , user , amounts) {
   return new Promise( async (resolve, reject) => {
   const timeZone =  process.env.TZ 
    const nowDate =  new Date();
      
        // // nuuca macaamiilka uu dalbaday ee lacagta 
         const typesMacaamiil = await selectTypes(macaamiil.types);

        // // lacagta la xaqiijinaayo
        const amoutchecking = await amountsCheck(amount)
        if(amoutchecking == 'not') resolve('not')

        // // dooro lacagta lasoo diray hadii ay saxan tahay 
        const sellamounts = await selecAmouts(amoutchecking.amount)
        if(sellamounts == 'not') resolve('not')
       
       // lacagta oo la diraayo plus pin
       const sendData =   `${typesMacaamiil.starts}${macaamiil.s_number}*${sellamounts.a_s}*${user.pin}#`;
       const insertValue = [ user.user_id , macaamiil.cid , macaamiil.name , macaamiil.h_number , macaamiil.s_number , typesMacaamiil.types , amounts , 'pending' , nowDate ]
       
      resolve({send: sendData , value : insertValue  , nowDate : nowDate })
      resolve(typesMacaamiil)
        
        
   })
}
module.exports = {
    hormuud
}