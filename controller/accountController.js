
const { validationResult } = require("express-validator");
const AccountService = require("../service/accountService");

/**
 * @description Register User
 *
 */

registerUser = async (req, res, next) => {
  // check request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errorMessage: "Validation Error!",
      errors: errors.array(),
    });
  }

  const { user } = req.body;
  var checkUsername = await AccountService.getProfileByUsername(user.username);
  var checkEmail = await AccountService.getProfileByEmail(user.email);

  if (checkUsername.data !== null) {
    return res.status(400).json({
      errorMessage: "Girmiş olduğunuz kullanıcı adı kullanılmaktadır. Lütfen başka bir kullanıcı adı giriniz.",
      field: "username",
      success: false,
    });
  }

  if (checkEmail.data !== null) {
    return res.status(400).json({
      errorMessage: "Sistemde kayıtlı bir e-posta girdiniz. Lütfen başka bir e-posta adresi giriniz. ",
      field: "email",
      success: false,
    });
  }

  const result = await AccountService.register(user);
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
      success: false,
      errorMessage: "Validation Error!",
      errors: errors.array(),
    });
  }

  const { userId } = req.body.user;
  result = await AccountService.getProfileById(userId);
  result.data.token = req.headers.token;
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
      success: false,
      errorMessage: "Validation Error!",
      errors: errors.array(),
    });
  }
  result = await AccountService.getToken(username, password, role);
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
      success: false,
      errorMessage: "Validation Error!",
      errors: errors.array(),
    });
  }
  result = await AccountService.getAllUsers(pageModel);
  res.send(result);
}

module.exports = {
  registerUser,
  getProfile,
  login,
  getAllUsersWithPagination
};
