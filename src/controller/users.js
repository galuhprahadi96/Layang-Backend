const helper = require("../helper/index");
const fs = require("fs");
const {
    getUserId,
    patchUser,
    checkEmail,
    checkPhone,
} = require("../model/users");

module.exports = {
    getUserById: async (request, response) => {
        try {
            const id = request.params.id;
            const checkId = await getUserId(id);

            if (checkId.length > 0) {
                const {
                    user_id,
                    user_name,
                    user_email,
                    user_phone,
                    user_image,
                    user_lat,
                    user_lng,
                    user_created_at,
                } = checkId[0];

                const setData = {
                    user_id: user_id,
                    user_name: user_name,
                    user_email: user_email,
                    user_phone: user_phone,
                    user_image: user_image,
                    user_lat: user_lat,
                    user_lng: user_lng,
                    user_created_at: user_created_at,
                };

                return helper.response(response, 200, "success get data user", setData);
            } else {
                return helper.response(response, 404, "Data user not found");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },

    updateDataUser: async (request, response) => {
        try {
            const id = request.params.id;
            const { user_name, user_phone, user_email } = request.body;
            const checkId = await getUserId(id);
            if (checkId.length > 0) {
                if (user_name === "" || user_name === undefined) {
                    return helper.response(response, 400, "input your name");
                } else if (user_email === "" || user_email === undefined) {
                    return helper.response(response, 400, "input your email");
                } else if (user_email.search("@") <= 0) {
                    return helper.response(response, 400, "input valid email");
                } else if (user_phone === "" || user_phone === undefined) {
                    return helper.response(response, 400, "input your phone");
                } else if (user_phone.length < 10 || user_phone.length > 13) {
                    return helper.response(response, 400, "input valid phone");
                } else {
                    const setData = {
                        user_name,
                        user_email,
                        user_phone,
                        // user_updated_at: new Date(),
                    };
                    const result = await patchUser(setData, id);

                    return helper.response(
                        response,
                        201,
                        "Success update data user",
                        result
                    );
                }
            } else {
                return helper.response(response, 404, "Data user not found");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },

    updateProfile: async (request, response) => {
        try {
            const id = request.params.id;
            const checkId = await getUserId(id);
            if (checkId.length > 0) {
                if (
                    checkId[0].user_image === "profile.png" ||
                    request.file.filename == undefined
                ) {
                    const setData = {
                        user_image: request.file.filename,
                    };
                    const result = await patchUser(setData, id);
                    return helper.response(
                        response,
                        201,
                        "success update your profile",
                        result
                    );
                } else {
                    fs.unlink(`./uploads/${checkId[0].user_image}`, async (err) => {
                        if (err) {
                            throw err;
                        } else {
                            const setData = {
                                user_image: request.file.filename,
                            };
                            const result = await patchUser(setData, id);
                            return helper.response(
                                response,
                                201,
                                "success update your profile",
                                result
                            );
                        }
                    });
                }
            } else {
                return helper.response(response, 404, "Data user not found");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
    resetProfile: async (request, response) => {
        try {
            const id = request.params.id;
            const checkId = await getUserId(id);
            if (checkId.length > 0) {
                fs.unlink(`./uploads/${checkId[0].user_image}`, async (err) => {
                    if (err) {
                        throw err;
                    } else {
                        const setData = {
                            user_image: "profile.png",
                        };
                        const result = await patchUser(setData, id);
                        return helper.response(
                            response,
                            201,
                            "success reset profile image",
                            result
                        );
                    }
                });
            } else {
                return helper.response(response, 404, "Data user not found");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
    updateLocation: async (request, response) => {
        const id = request.params.id;
        const { lat, lng } = request.body;
        try {
            const checkId = await getUserId(id);
            if (checkId.length > 0) {
                const setData = {
                    user_lat: lat,
                    user_lng: lng
                };
                const result = await patchUser(setData, id);
                return helper.response(response, 201, "Location Updated", result);
            }
            return helper.response(response, 404, "Data user not found");
        } catch (err) {
            return helper.response(response, 400, "Bad Request", err);
        }
    },
    getFindUser: async (request, response) => {
        const { keyword } = request.query;
        try {
            const email = await checkEmail(keyword);
            const phone = await checkPhone(keyword);
            if (email.length > 0) {
                delete email[0].user_password;
                delete email[0].user_key;
                delete email[0].user_status;
                delete email[0].user_created_at;
                delete email[0].user_updated_at;
                return helper.response(
                    response,
                    200,
                    "Get User by Email Success",
                    email
                );
            } else if (phone.length > 0) {
                delete phone[0].user_password;
                delete phone[0].user_key;
                delete phone[0].user_status;
                delete phone[0].user_created_at;
                delete phone[0].user_updated_at;
                return helper.response(
                    response,
                    200,
                    "Get User by Phone Success",
                    phone
                );
            } else {
                return helper.response(response, 404, "user not found");
            }
        } catch (err) {
            return helper.response(response, 400, "Bad Request", err);
        }
    },
};