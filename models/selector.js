function constFind(value) {
    return new Promise((resolve, reject) => {
        const nooca = `SELECT * FROM types WHERE ${value} = ?`
        const cost = `SELECT * FROM macaamiil WHERE ${value} = ? AND xaalada = 'active' AND user_id = ?`
        const  check_Send = "SELECT * FROM natiijo WHERE cos_id = ? AND xaalada = 'pending' ORDER BY id DESC"
        const selectamounts = "SELECT * FROM doorashada WHERE a_r = ? AND xaalada = 'active'"
        const amoutss = 'SELECT * FROM amounts WHERE amount = ?';
        const deviceSelector = "SELECT * FROM user_login WHERE  deviceid = ? AND xaalada = 'active'"
        const find_send = "SELECT * FROM send_now WHERE  user_id = ? AND xaalada = 'pending'";
        const find_activty = "SELECT * FROM natiijo WHERE  h_number = ?  ORDER BY id DESC";
        const find = {
            nooca:nooca , 
            cost: cost , 
            check_Send:check_Send,
            selectamounts:selectamounts,
            amoutss:amoutss,
            deviceSelector:deviceSelector,
            find_send:find_send,
            find_activty:find_activty

        }
        resolve(find)
    })
}
function constInst() {
    return new Promise((resolve, reject) => {
        const dalab = "INSERT INTO natiijo (user_id, cos_id, magaca , h_number , s_number , types , amount  , xaalada , created_at) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)"
        const msg = "INSERT INTO msgs (user_id, sender , body , created_at) VALUES (? ,? ,? ,? )"
        const insert = {
            dalab:dalab , 
            msg: msg
        }
        resolve(insert)
    })
}

function constUpdate() {
    return new Promise((resolve, reject) => {
        const update_balance = "UPDATE user_login SET balance = ? WHERE  user_id= ?"
        const update_natiijo = "UPDATE natiijo SET xaalada ='success' WHERE  id= ?"
        const update_send = "UPDATE send_now SET xaalada = 'success WHERE  id= ?"
        const update = {
            update_balance:update_balance , 
            update_natiijo: update_natiijo,
            update_send:update_send
        }
        resolve(update)
    })
}


module.exports =  { 
    constFind , 
    constInst ,
    constUpdate
}







