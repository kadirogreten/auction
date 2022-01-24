const User = require("../model/user");
const jwt = require("jsonwebtoken");

/**Serializers functions */
const {
  registerResponseSerializers,
  profileResponseSerializers,
  tokenResponseSerializers,
} = require("../serializers/responseSerializers");

/**encrypt and hash password */
const { hashedPassword, encryptPassword } = require("../utils/Auth");

/**secret key  */
const { SECRET } = require("../config/index");

// Pagination

const { paginationData } = require("../middlewares/paginationMiddleware");

/** register */
register = async (user) => {
  try {
    let newUser = new User({
      ...user,
      createdAt: Date.now(),
      updatedAt: null,
      deletedAt: null,
      password: await hashedPassword(user.password),
    });

    await newUser.save();
    return {
      success: true,
      data: registerResponseSerializers(newUser),
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
};

getAllWithPagination = async (pageModel) => {
  let result;
  try {
    result = await paginationData(User, pageModel.page, pageModel.limit);
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
  return {
    success: true,
    data: result,
  };
};

/**get profile by id */
getProfileById = async (id) => {
  // return Promise result from MongoDB
  let result;
  try {
    const options = {
      // Include only the `name`, `username`, `email` and `_id` fields in the returned document
      projection: {
        password: 0,
        __v: 0,
      },
    };
    result = await User.findById(id, options.projection);
    if (!result) {
      return {
        success: false,
        errorMessage: "kullanıcı bulunamadı",
      };
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
  return {
    success: true,
    data: profileResponseSerializers(result),
  };
};
/** get profile by username */
getProfileByUsername = async (username) => {
  // return Promise result from MongoDB
  let result;
  try {
    const options = {
      // Include only the `name`, `username`, `email` and `_id` fields in the returned document
      projection: {
        password: 0,
        __v: 0,
      },
    };

    result = await User.findOne(
      {
        username: username,
      },
      options
    );
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
  return {
    success: true,
    data: profileResponseSerializers(result),
  };
};

/**login  */

login = async (username, password, role) => {
  // return Promise result from MongoDB
  let result;
  try {
    user = await User.findOne({
      username: username,
    });
    if (!user) {
      return {
        errorMessage: "Kullanıcı adı veya şifre hatalı!",
        success: false,
      };
    }

    if (user.role !== role) {
      return {
        errorMessage: "Kullanıcı adı veya şifre hatalı!",
        success: false,
      };
    }

    let isMatchPassword = await encryptPassword(password, user.password);

    console.log(`Şifre: ${isMatchPassword}`);

    if (isMatchPassword) {
      let token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        SECRET,
        {
          expiresIn: "365 days",
        }
      );

      result = tokenResponseSerializers(user, token);
    } else {
      return {
        errorMessage: "Kullanıcı adı veya şifre hatalı!",
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
  return {
    success: true,
    data: result,
  };
};

module.exports = {
  register,
  getProfileById,
  getProfileByUsername,
  login,
  getAllWithPagination,
};
