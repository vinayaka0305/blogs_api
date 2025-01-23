const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//registration

const register = async (req, res) => {
  try {
    // Check if all required fields are present
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Check for duplicate email
    const existingUser = await userSchema.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "Email already exists",
      });
    }

    const data = await new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await data.save();

    res.status(201).json({
      status: "success",
      message: "user is created",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        status: "failed",
        message: "pls provide email and password",
      });
    } else {
      const user = await userSchema.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "email not found",
        });
      }

      const passwordBcrypt = bcrypt.compareSync(password, user.password);
      if (user && !passwordBcrypt) {
        return res.status(404).json({
          status: "failed",
          message: "wrong password",
        });
      }
      const token = jwt.sign({ name: user.name, id: user._id }, "vinayaka", {
        expiresIn: "1h",
      });

      res.status(200).json({
        status: "login successfull",
        toke: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

module.exports = { register, login };
