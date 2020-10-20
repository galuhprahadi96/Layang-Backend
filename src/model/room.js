const connection = require("../config/mysql");

module.exports = {
    getRoomById: (code_chatroom, user_id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM chatroom WHERE user_id = ? AND code_chatroom = ?', [user_id, code_chatroom], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getRoomByUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM chatroom WHERE user_id = ?",
                user_id,
                (error, response) => {
                    !error ? resolve(response) : reject(new Error(error));
                }
            );
        });
    },
    getRoomByRoomId: (code_chatroom) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT chatroom.code_chatroom, chatroom.user_id, chatroom.chatroom_created_at, users.user_name, users.user_image FROM chatroom JOIN users ON chatroom.user_id = users.user_id WHERE chatroom.code_chatroom = ? ORDER BY users.user_name ASC",
                code_chatroom,
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
    },
    checkRoom: (user_id, friend_id) => {
        let check = ""
        check = `WHERE (user_id = ${user_id} OR user_id = ${friend_id}) AND (friend_id = ${user_id} OR friend_id = ${friend_id})`
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM chatroom ${check}`, (error, response) => {
                !error ? resolve(response) : reject(new Error(error));
            })

        })
    }
};