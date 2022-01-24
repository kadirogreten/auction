const express = require("express");
const router = express.Router();
const { check } = require("express-validator"); // bunu body ve request leri validate etmek için kullanıyoruz
const { checkRole } = require("../middlewares/roleMiddleware");

// Controller
const AccountController = require("../controller/accountController");
const AuthorizationController = require("../controller/authorizationController");

// users registiration Route

router.post(
  "/register",
  check("user").exists().notEmpty(),
  AccountController.registerUser // tüm validasyonlardan sonra artık controller a gönderiyoruz
);

// user login Route

router.post(
  "/login",
  check(["username", "password", "role"]).exists().notEmpty(),
  AccountController.login
);

// profile

router.post(
  "/profile",
  checkRole(["User", "Admin", "Superuser", "Moderator"]),
  check("id").exists().notEmpty(),
  AuthorizationController.validateToken,
  AccountController.getProfile // tüm validasyonlardan sonra artık controller a gönderiyoruz
);

/** role tanımlamaları */
router.post(
  "/sendOffer",
  checkRole(["Admin", "Moderator"]),
  check("id").exists().notEmpty(),
  AuthorizationController.validateToken,
  AccountController.getProfile
);

router.post(
  "/getUser",
  check("role").exists().notEmpty(),
  AuthorizationController.validateToken,
  AccountController.getProfile
);

module.exports = router;
