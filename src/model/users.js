const connection = require("../config/mysql");

module.exports = {
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_email = ?",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkPhone: (phone) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_phone = ?",
        phone,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_id = ?",
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
  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE user_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              user_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
