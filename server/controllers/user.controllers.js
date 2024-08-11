const User = require("../models/user.models");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const bcryptUtil = require("../utils/bcrypt.util");
const { createToken } = require("../utils/jwt.utils");

//@description     Create user object
//@route           POST /register
//@access          Not Protected

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, full_name } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists", [
      {
        email: "User with email or username already exists",
      },
    ]);
  }

  const hashedPassword = await bcryptUtil.createHash(password);

  const newUser = await User.create({
    fullName: full_name,
    email: email,
    password: hashedPassword,
  });

  const user = await User.findById(newUser._id).select("-password");
  let token = await createToken(user);

  // Send token in response body
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user,
        token, // Include the token in the response body
      },
      "User has been created"
    )
  );
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existedUser = await User.findOne({ email });

  if (!existedUser) {
    throw new ApiError(409, "User does not exist", [
      {
        email: "User does not exist",
      },
    ]);
  }

  const isPasswordMatch = await bcryptUtil.compareHash(
    password,
    existedUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials", [
      {
        password: "Invalid credentials",
      },
    ]);
  }

  const user = await User.findById(existedUser._id).select("-password");
  let token = await createToken(user);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        token, // Include the token in the response body
      },
      "User has been logged in"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  // Instead of clearing cookies, simply send a success response
  return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
});

module.exports = { registerUser, login, logoutUser };
