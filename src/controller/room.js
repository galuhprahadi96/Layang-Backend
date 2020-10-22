const helper = require("../helper");
const { getRoomByUserId, postRoom, checkRoom } = require("../model/room");
const { getLatestMessage } = require("../model/message");
const { getUserId } = require("../model/users");

module.exports = {
    getRoomByUserId: async (request, response) => {
        try {
            const user_id = request.params.id;
            const dataRoom = await getRoomByUserId(user_id);
            // console.log(dataRoom);
            if (dataRoom.length > 0) {
                for (let i = 0; i < dataRoom.length; i++) {
                    let dataUser = await getUserId(dataRoom[i].receiver);
                    // console.log(dataUser)
                    dataRoom[i].user_name = dataUser[0].user_name
                    dataRoom[i].user_image = dataUser[0].user_image

                    let recentMsg = await getLatestMessage(dataRoom[i].code_chatroom);
                    // console.log(recentMsg)
                    if (recentMsg.length > 0) {
                        dataRoom[i].recent_message = recentMsg[0].message
                    }else{
                        dataRoom[i].recent_message = ""
                    }
                }
                // console.log(dataRoomChat)
                return helper.response(response, 200, "Get Room Success", dataRoom);
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
            const check = await checkRoom(user_id, friend_id);
            if (check.length <= 0) {
                const setData1 = {
                code_chatroom: chatroom,
                sender: user_id,
                receiver: friend_id,
                chatroom_created_at: new Date(),
                };
                await postRoom(setData1);

                const setData2 = {
                    code_chatroom: chatroom,
                    sender: friend_id,
                    receiver: user_id,
                    chatroom_created_at: new Date(),
                };
                  // console.log(setData);
                await postRoom(setData2);
                return helper.response(response, 200, "Room Created", chatroom);
            } else {
                return helper.response(response, 400, "Room Is Already", chatroom);
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request");
        }
    },
};