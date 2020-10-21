const { response } = require("express");
const connection = require("../config/mysql");

module.exports = {
  getLatestMessage: (code_chatroom) => {
    return new Promise((resolve, reject) => {
       connection.query('SELECT * FROM message WHERE code_chatroom = ? ORDER BY message_created_at DESC LIMIT 1', code_chatroom, (error, result) => {
           !error ? resolve(result) : reject(new Error(error))
       })
    })
  },
  getMessageRoomId: (code_chatroom) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM message WHERE code_chatroom = ?",
        code_chatroom,
        (error, response) => {
          !error ? resolve(response) : reject(new Error(error));
        }
      );
    });
  },
  postMessage: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO message SET ?",
        setData,
        (error, response) => {
          !error ? resolve(response) : reject(new Error(error));
        }
      );
    });
  },
};
