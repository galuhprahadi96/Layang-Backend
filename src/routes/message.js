const router = require("express").Router();
const { getMessageByRoomId, sendMessage } = require("../controller/message");

const { authUser } = require("../middleware/auth")

router.get("/", authUser, getMessageByRoomId);
router.post("/", authUser, sendMessage);

module.exports = router;
