const helper = require("../helper");
const { getRoomById } = require("../model/room");
const { getUserId } = require("../model/users");
const { getMessageRoomId, postMessage } = require("../model/message");

module.exports = {
    getMessageByRoomId: async (request, response) => {
        try {
            const { code_chatroom, user_id } = request.query;
            const result = await getRoomById(code_chatroom, user_id)
            if (result.length > 0) {
                const getDataGetter = await getUserId(result[0].user_id)
                result[0].room_name = getDataGetter[0].user_name
                result[0].room_img = getDataGetter[0].user_image
                const getMessage = await getMessageRoomId(code_chatroom)

                if (getMessage.length > 0) {
                    for (i = 0; i < getMessage.length; i++) {
                        const getSender = await getUserId(getMessage[i].sender)
                        getMessage[i].sender_name = getSender[0].user_name
                        getMessage[i].sender_img = getSender[0].user_image
                    }
                }
                result[0].messages = getMessage
                return helper.response(response, 200, `Success get room ${code_chatroom}`, result)
            } else {
                return helper.response(response, 200, `Room ${code_chatroom} & user ID ${user_id} is not found`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request");
        }
    },
    sendMessage: async (request, response) => {
        try {
            const { code_room, sender_id, receiver_id, message } = request.body;
            const setData = {
                code_chatroom: code_room,
                sender: sender_id,
                getter: receiver_id,
                message,
                message_created_at: new Date(),
            };
            await postMessage(setData);
            return helper.response(response, 200, "success send message");
        } catch (err) {
            return helper.response(response, 400, "Bad Request");
        }
    },
};