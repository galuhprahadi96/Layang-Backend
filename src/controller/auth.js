const bcrypt = require("bcrypt");
const helper = require("../helper/index");
const jwt = require("jsonwebtoken");

const { checkEmail, postUser } = require("../model/users");

module.exports = {
    register: async (request, response) => {
        try {
            const { user_name, user_email, user_phone, user_password } = request.body;

            if (user_name === "" || user_name === undefined) {
                return helper.response(response, 400, "please input your name");
            } else if (user_email === "" || user_email === undefined) {
                return helper.response(response, 400, "please input your email");
            } else if (user_email.search("@") <= 0) {
                return helper.response(response, 400, "please input valid email");
            } else if (user_phone === "" || user_phone === undefined) {
                return helper.response(response, 400, "please input your phone");
            } else if (user_phone.length < 10 || user_phone.length > 13) {
                return helper.response(response, 400, "input valid phone");
            } else if (user_password === "" || user_password === undefined) {
                return helper.response(response, 400, "please input your password");
            } else {
                const check = await checkEmail(user_email);
                if (check.length > 0) {
                    return helper.response(response, 400, "Email already registered");
                } else {
                    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                    if (user_password.match(regex)) {
                        const salt = bcrypt.genSaltSync(10);
                        const encryptPassword = bcrypt.hashSync(user_password, salt);

                        const setData = {
                            user_name,
                            user_email,
                            user_password: encryptPassword,
                            user_phone,
                            user_lat: "",
                            user_lng: "",
                            user_image: "profile.png",
                            user_key: 0,
                            user_status: 1,
                            user_created_at: new Date(),
                        };
                        const result = await postUser(setData);

                        return helper.response(
                            response,
                            200,
                            "your account success registered",
                            result
                        );
                    } else {
                        return helper.response(
                            response,
                            400,
                            "Password At least 8 characters, at least one letter and one number"
                        );
                    }
                }
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },

    login: async (request, response) => {
        try {
            const { user_email, user_password } = request.body;
            if (user_email === "" || user_email === undefined) {
                return helper.response(response, 400, "please input your email");
            } else if (user_email.search("@") <= 0) {
                return helper.response(response, 400, "please input valid email");
            } else if (user_password === "" || user_password === undefined) {
                return helper.response(response, 400, "please input your password");
            } else {
                const check = await checkEmail(user_email);
                if (check.length >= 1) {
                    const checkPassword = bcrypt.compareSync(
                        user_password,
                        check[0].user_password
                    );
                    if (checkPassword) {
                        const {
                            user_id,
                            user_email,
                            user_name,
                            user_image,
                            user_phone,
                            user_lat,
                            user_lng,
                        } = check[0];
                        if (check[0].user_status === 1) {
                            let payload = {
                                user_id,
                                user_email,
                                user_name,
                                user_image,
                                user_phone,
                                user_lat,
                                user_lng,
                            };
                            const token = jwt.sign(payload, "RAHASIA", {
                                expiresIn: "1h",
                            });
                            payload = { ...payload, token };

                            return helper.response(response, 200, "Success login", payload);
                        } else {
                            return helper.response(
                                response,
                                400,
                                "Your account is not activated, please check your Email"
                            );
                        }
                    } else {
                        return helper.response(response, 400, "Wrong Password");
                    }
                } else {
                    return helper.response(response, 400, "Email not Registered");
                }
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
};