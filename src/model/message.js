const { response } = require("express");
const connection = require("../config/mysql");

module.exports = {
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
