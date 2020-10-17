const router = require("express").Router();
const uploadFilter = require("../middleware/multer");
const {
    getUserById,
    updateDataUser,
    updateProfile,
    updateLocation,
    getFindUser,
} = require("../controller/users");

const { authUser } = require("../middleware/auth")

router.get("/search", authUser, getFindUser);
router.get("/:id", authUser, getUserById);
router.patch("/location/:id", authUser, updateLocation);
router.patch("/profile/:id", authUser, uploadFilter, updateProfile);
router.patch("/:id", authUser, updateDataUser);
module.exports = router;