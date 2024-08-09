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

  console.log("check email over here", email);

  const exitedUser = await User.findOne({ email });

  if (exitedUser) {
    throw new ApiError(409, "User with email or username already exists", [
      {
        message: "User with email or username already exists",
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

  const options = {
    httpOnly:false,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,

  };

  return res.status(201).cookie("accessToken", token, options).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "user has been created"
    )
  );
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("check email over here", email, password);

  const exitedUser = await User.findOne({ email });

  if (!exitedUser) {
    throw new ApiError(409, "User does not existed", [
      {
        email: "User does not existed",
      },
    ]);
  }

  const isPasswordMatch = await bcryptUtil.compareHash(
    password,
    exitedUser.password
  );

  console.log("chck the useraasfdsa", isPasswordMatch);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid credentials", [
      {
        password: "Invalid credentials",
      },
    ]);
  }

  const user = await User.findById(exitedUser._id).select("-password");
  let token = await createToken(user);

  const options = {
    httpOnly: false,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  return res.status(201).cookie("accessToken", token, options).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "user has been logged"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

module.exports = { registerUser, login , logoutUser};
