const router = require("express").Router();
const {
    getFriendById,
    addFriend,
    deleteFriend,
} = require("../controller/friend");

const { authUser } = require("../middleware/auth")

router.get("/:id", authUser, getFriendById);
router.post("/", authUser, addFriend);
router.delete("/", authUser, deleteFriend);
module.exports = router;