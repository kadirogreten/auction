const express = require("express");
const router = express.Router();
const { check } = require("express-validator"); // bunu body ve request leri validate etmek için kullanıyoruz
const { validateToken } = require("../utils/Auth");
const { checkRole } = require("../middlewares/roleMiddleware");

// Controller
const AccountController = require("../controller/accountController");

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
  validateToken,
  checkRole(["User", "Admin", "Superuser", "Moderator"]),
  check("id").exists().notEmpty(),
  AccountController.getProfile // tüm validasyonlardan sonra artık controller a gönderiyoruz
);

/** role tanımlamaları */
router.post(
  "/sendOffer",
  validateToken,
  checkRole(["Admin", "Moderator"]),
  check("id").exists().notEmpty(),
  AccountController.getProfile
);

router.post(
  "/getUsers",
  AccountController.getAllUsersWithPagination
);

module.exports = router;
