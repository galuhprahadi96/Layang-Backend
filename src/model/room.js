const connection = require("../config/mysql");

module.exports = {
    getRoomById: (user_id, code_chatroom) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM chatroom WHERE receiver = ${user_id} AND code_chatroom = ${code_chatroom}`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getRoomByUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM chatroom WHERE sender = ?",
                user_id,
                (error, response) => {
                    !error ? resolve(response) : reject(new Error(error));
                }
            );
        });
    },
    postRoom: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO chatroom SET ?", setData, (error, response) => {
                !error ? resolve(response) : reject(new Error(error));
            });
        });
    }
};