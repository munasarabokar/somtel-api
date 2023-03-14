const { Device } = require("./check")
const { hormuud } = require("./hor")
const { constFind , constInst } = require("./selector")
const { somtel, updateBalence } = require("./som")
const db = require('../database/data')

function InserDalab(value) {
  return new Promise( async (resolve, reject) => {
    const insert = await constInst()
  db.query(insert.dalab , value , (err , data) => {
    if(err) resolve('err')
    resolve('oke')
  })
})
    
}

 function InserMsgs(body , user , time) {
    return new Promise( async (resolve, reject) => {
      const insert = await constInst()
      db.query(insert.msg , [ user.user_id , body.sender , body.list , time ] , (err , data) => {
        if(err) resolve('err')
        resolve('oke')
      })
    })
 }
 function filterText(text) {
    return new Promise((resolve, reject) => {
        const number  = text.list.replace(/[^0-9\.]+/g, ",");
        var checking = []
        const words = number.split(",")
        words.forEach(counts)
        function counts(c) {
          checking.push({ c })
        } 
        resolve(checking)
    })
 }
 function filterTextString(text) {
  return new Promise((resolve, reject) => {
      var filter = []
      const words = text.list.split(" ")
      words.forEach(counts)
      function counts(t) {
        filter.push({ t })
      } 
      resolve(filter)
  })
}

function findCostumers( number , user , type) {
  return new Promise( async (resolve, reject) => {
    const select = await constFind(type)
    resolve({select : select.cost , id : number , user: user , type:type})
      // db.query(select.cost , [ number , user ] , (err , data ) => {
      //     if(err) resolve('errzz')
      //     if(data?.length > 0) {
      //         resolve(data[0])
      //     } else {
      //           resolve('not')
      //     }
      // })
  })
  
}

function findUnknowTypes(type) {
  return new Promise(async (resolve, reject) => {
    const select = await constFind(`nooca`)
     db.query(select.nooca , [type] , (err , data) => {
      if(err) resolve(err)
      if(data?.length > 0) {
        resolve(data[0].types)
      } else {
        resolve('not')
      }
     })
  })
 }

function sender(device , body) {
    return new Promise( async (resolve, reject) => {
      const timeZone =  process.env.TZ 
      const nowDate =  new Date();
        const check = await Device(device) 
        if (check == 'not') resolve('check false')
       if (body.sender == '192') {
        const hortel = await filterText(body)
       const macaamiilka = await findCostumers(hortel[2].c.substring(1) , check.user_id , `h_number`)
       if(macaamiilka == 'not') { resolve('not')} else {
         const hor = await hormuud(macaamiilka , hortel[1].c+' ' , check , hortel[1].c )
       if(hor == 'not') resolve('not')
        await InserDalab(hor.value)
        await InserMsgs(body , check , nowDate)
         resolve(hor.send)
       }
       } else if (body.sender == 'Reseller') {
        const telecom = await filterTextString(body)
        const userss = await findCostumers(telecom[6].t , check.user_id , `s_number`)
        if(userss == 'not') {
         const typing = await findUnknowTypes(telecom[12].t)
         if(typing == 'not') resolve('not')
         const values = [check.user_id , 000 , 'unkown' , '61000' , telecom[6].t , typing , telecom[10].t , 'success' ,  nowDate]
         await InserDalab(values); 
         await updateBalence(check.user_id , telecom[17].t)
         await InserMsgs(body , check , nowDate)
          resolve(values)
        } else {
           const somtell = await somtel(check , userss , telecom )
        if(somtell.msg == 'oke') {
          await InserDalab(somtell.value);
          await InserMsgs(body , check , nowDate) 
          resolve(somtell.msg)
        } 
        }
       
       }
    })
}


module.exports = {
    sender , 
    findCostumers,
}