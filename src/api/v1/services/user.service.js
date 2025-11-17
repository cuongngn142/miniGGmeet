const bcrypt = require("bcryptjs");
const User = require("../../../models/User");
const {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../../../utils/error.util");

function sanitizeUser(user) {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  return userObj;
}

async function register({ email, displayName, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("Email already registered");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    displayName,
    password: hashedPassword,
  });
  return sanitizeUser(user);
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }
  return sanitizeUser(user);
}

async function getUserById(userId) {
  const user = await User.findById(userId)
    .populate("friends", "displayName email")
    .populate("friendRequests", "displayName email");
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return sanitizeUser(user);
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return sanitizeUser(user);
}

module.exports = {
  register,
  login,
  getUserById,
  getUserByEmail,
  sanitizeUser,
};
