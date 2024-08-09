const { Router } = require("express");
const {
  registerUser,
  login,
  logoutUser,
} = require("../controllers/user.controllers");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validator/user.validator");
const { validate } = require("../validator/validate");
const { verifyJWT } = require("../middlewares/auth.middlewares");

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, login);
router.route("/logout").post(verifyJWT, logoutUser);

module.exports = router;
