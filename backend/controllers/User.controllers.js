const User = require("../models/User.models.js");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).send("An error occurred while creating the user");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("error aya ");
  }
};

module.exports = { registerUser };
