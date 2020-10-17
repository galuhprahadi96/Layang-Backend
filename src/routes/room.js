const router = require("express").Router();
const { getRoomByUserId, createRoom } = require("../controller/room");

const { authUser } = require("../middleware/auth")

router.get("/:id", authUser, getRoomByUserId);

router.post("/", authUser, createRoom);

module.exports = router;
