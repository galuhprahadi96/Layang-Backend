const helper = require("../helper");
const { getRoomByUserId, getRoomByRoomId, checkRoom, postRoom } = require("../model/room");

module.exports = {
    getRoomByUserId: async (request, response) => {
        try {
            const user_id = request.params.id;
            // console.log(request.params);
            const dataRoom = await getRoomByUserId(user_id);
            // console.log(dataRoom);
            if (dataRoom.length > 0) {
                // console.log("masih belum")
                const codeRoom = dataRoom.map((val) => {
                    return val.code_chatroom;
                    // console.log(e)
                });
                let dataRoomChat = [];
                for (let i = 0; i < codeRoom.length; i++) {
                    // console.log(roomId);
                    let data = await getRoomByRoomId(codeRoom[i]);
                    const result = data.filter(
                        (val) => val.user_id !== parseInt(user_id)
                    )
                    dataRoomChat = dataRoomChat.concat(result);
                }
                return helper.response(response, 200, "Get Room Success", dataRoomChat);
            } else {
                return helper.response(response, 400, "Please created room");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request");
        }
    },
    createRoom: async (request, response) => {
        try {
            const chatroom = Math.round(Math.random() * 100000);
            const { user_id, friend_id } = request.body
            const check = await checkRoom(user_id, friend_id)
            if (!check.length > 0) {
                const setData = {
                    code_chatroom: chatroom,
                    user_id: user_id,
                    friend_id: friend_id,
                    chatroom_created_at: new Date(),
                };
                const result = await postRoom(setData);
                return helper.response(response, 200, "Room Created", chatroom);
            } else {
                return helper.response(response, 400, "Room Already Created");
            }

        } catch (error) {
            return helper.response(response, 400, "Bad Request");
        }
    },
};