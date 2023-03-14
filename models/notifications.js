const { Device, checkSend } = require("./check")

function gettingNotification(device) {
    return new Promise(async (resolve, reject) => {
        const check  = await Device(device)
        if(check == 'not') resolve({msg : "notss"})
        else  {
            const find = await checkSend(check.user_id)
            resolve(find)
        }})
}


module.exports ={
    gettingNotification
}