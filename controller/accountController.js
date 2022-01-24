
const { validationResult } = require("express-validator");
const { register, getProfileById, getToken, getAllUsers } = require("../service/accountService");
const { validateEmail, validateUsername } = require("../utils/Auth");


/**
 * @description Register User
 *
 */

registerUser = async (req, res, next) => {
  // check request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { user } = req.body;
  console.log(user);

  if (!validateUsername(user.username)) {
    console.log("validateUsername(user.username)");
    return res.status(400).json({
      message: "Username daha önceden kayıtlı",
      success: false,
    });
  }

  if (!validateEmail(user.email)) {
    return res.status(400).json({
      message: "E-posta daha önceden kayıtlı",
      success: false,
    });
  }

  const result = await register(user);
  res.send(result);
};

/**
 * @description get profile
 */

getProfile = async (req, res, next) => {
  // check request
  let result;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { id } = req.body;
  console.log(id);
  result = await getProfileById(id);

  res.send(result);
};

/**
 * @description login
 */

login = async (req, res, next) => {

  let { username, password, role } = req.body;
  let result;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  result = await getToken(username, password, role);
  console.log(result);
  res.send(result);
};

getAllUsersWithPagination = async (req, res, next) => {
  let { page, limit } = req.body;
  if (page == undefined || page == null || page == 0) {
    page = 1;
  }

  if (limit == undefined || limit == null || limit == 0) {
    limit = 5;
  }
  let pageModel = {
    page: page,
    limit: limit
  };
  let result;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  console.log(pageModel);
  result = await getAllUsers(pageModel);
  console.log(result);
  res.send(result);
}

module.exports = {
  registerUser,
  getProfile,
  login,
  getAllUsersWithPagination
};
