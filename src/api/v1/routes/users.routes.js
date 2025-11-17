const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const {
  loginValidation,
  registerValidation,
} = require("../validators/auth.validator");

const {
  register,
  login,
  logout,
  getMe,
  getProfile,
} = require("../controllers/users/users.controller");

// POST /api/v1/users/register
router.post("/register", registerValidation, validate, register);

// POST /api/v1/users/login
router.post("/login", loginValidation, validate, login);

// POST /api/v1/users/logout
router.post("/logout", requireAuth, logout);

// GET /api/v1/users/me
router.get("/me", requireAuth, getMe);

// GET /api/v1/users/profile
router.get("/profile", requireAuth, getProfile);

module.exports = router;
