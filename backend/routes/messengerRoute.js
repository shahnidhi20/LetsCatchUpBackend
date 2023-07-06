const router = require("express").Router();

const {
  getFriends,
  messageUpload,
  getMessage,
  deleteMessage,
} = require("../controller/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, getFriends);
router.post("/send-message", authMiddleware, messageUpload);
router.post("/get-message", authMiddleware, getMessage);
router.delete("/delete-message/:senderid", authMiddleware, deleteMessage);

module.exports = router;
