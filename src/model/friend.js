const connection = require("../config/mysql");

module.exports = {
    getFriendListById: (user_id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT friendlist.friendlist_id, users.user_id, users.user_name, users.user_image, users.user_email, users.user_phone, users.user_lng, users.user_lat FROM friendlist JOIN users ON friendlist.friend_id = users.user_id WHERE friendlist.user_id = ?",
                user_id,
                (error, result) => {
                    if (!error) {
                        resolve(result);
                    } else {
                        reject(new Error(error));
                    }
                }
            );
        });
    },
    postFriendList: (setData) => {
        let checkFriend = ''
        checkFriend = `WHERE (friendlist.user_id=${setData.user_id} OR friendlist.user_id=${setData.friend_id}) AND (friendlist.friend_id=${setData.user_id} OR friendlist.friend_id=${setData.friend_id})`
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users INNER JOIN friendlist ON users.user_id = friendlist.friend_id ${checkFriend}`, (error, result) => {
                if (!error) {
                    if (result == '') {
                        connection.query('INSERT INTO friendlist SET ?', setData, (error, result) => {
                            if (!error) {
                                resolve('Add Friend success')
                            } else {
                                reject(new Error(error))
                            }
                        })
                    } else {
                        resolve('Already Friends')
                    }
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteFriend: (user_id, friendListId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `DELETE from friendlist WHERE user_id = ${user_id} AND friendlist_id = ${friendListId}`,
                (error, response) => {
                    !error ? resolve(response) : reject(new Error(error));
                }
            );
        });
    },
};