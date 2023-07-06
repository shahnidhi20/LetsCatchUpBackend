const router = require("express").Router();

const {
  userRegister,
  userLogin,
  deleteUser,
  updateUser,
} = require("../controller/authController");

router.post("/user-login", userLogin);
router.post("/user-register", userRegister);
router.delete("/delete-user/:id", deleteUser);
router.put("/update-user/:id", updateUser);

module.exports = router;
