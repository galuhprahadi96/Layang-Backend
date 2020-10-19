const helper = require("../helper/index");

const {
  getFriendListById,
  postFriendList,
  deleteFriend,
} = require("../model/friend");

module.exports = {
  getFriendById: async (request, response) => {
    try {
      const id = request.params.id;
      const checkId = await getFriendListById(id);
      if (checkId.length > 0) {
        return helper.response(
          response,
          200,
          "success get friend list",
          checkId
        );
      } else {
        return helper.response(response, 404, "add friend first");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  addFriend: async (request, response) => {
    try {
      const { user_id, friend_id } = request.body;
      const setData = {
        user_id,
        friend_id,
      };
      console.log(setData)
      const result = await postFriendList(setData);
      return helper.response(response, 200, `success add friend`, result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteFriend: async (request, response) => {
    try {
      const { user_id, friendlist_id } = request.query;
      await deleteFriend(user_id, friendlist_id);
      return helper.response(response, 200, "success deleted friend");
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
