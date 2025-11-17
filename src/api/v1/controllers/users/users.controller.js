const userService = require("../../services/user.service");
const ApiResponse = require("../../../../utils/response.util");

exports.register = async (req, res, next) => {
  try {
    const { email, displayName, password } = req.body;
    const user = await userService.register({ email, displayName, password });
    req.session.user = {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
    };
    return ApiResponse.created(res, { user }, "Đăng ký thành công");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    req.session.user = {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
    };
    return ApiResponse.success(res, { user }, "Đăng nhập thành công");
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      return ApiResponse.success(res, null, "Đăng xuất thành công");
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    return ApiResponse.success(
      res,
      { user },
      "Lấy thông tin người dùng thành công"
    );
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    return ApiResponse.success(res, { user });
  } catch (error) {
    next(error);
  }
};
