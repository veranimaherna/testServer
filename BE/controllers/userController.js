const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const createdUser = await User.create({
      name: name.toLowerCase(),
      email: email,
      role: role,
      password: await bcrypt.hashSync(password, 10),
    });
    res.status(201).json({ message: "User Created", data: createdUser });
  } catch (error) {
    res.status(400).json({ message: "Failed to Register" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const userName = User.name;
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, level: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.json({
      message: "Logged in Succesfully",
      token,
      userName: user.name,
      userId: user.id,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to Login" });
  }
};

exports.allProfile = async (req, res) => {
  try {
    const listUser = await User.findAll();
    res.status(200).json({ message: "List of Users", data: listUser });
  } catch (error) {
    res.status(400).json({ message: "Failed to Get User" });
  }
  // res.json({ message: "My Profile" });
};

exports.profileById = async (req, res) => {
  try {
    const id = req.params.id;
    const listProfile = await User.findOne({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json({ message: `User Profile By Id ${id}`, data: listProfile });
  } catch (error) {
    res.status(400).json({ message: `Failed to get profile by id ${id}` });
  }
};

exports.updateAvatar = async (req, res) => {
  const userId = req.params.id;
  const profilePicturePath = req.file.path;
  const finalImageUrl = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    user.profile_image = finalImageUrl;
    await user.save();

    res.status(200).json({ message: "Profile picture updated successfully", image: finalImageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.params.id;
  const { old_password, new_password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    const validPassword = await bcrypt.compare(old_password, user.password);
    const samePassword = await bcrypt.compare(new_password, user.password);

    if (samePassword) {
      res.status(500).json({ message: "Password lama dan baru tidak boleh sama" });
    }
    else if (validPassword) {
      user.password = await bcrypt.hashSync(new_password, 10);
      await user.save();
      res
        .status(200)
        .json({ message: "Updated successfully", user });
      console.log(user);
    } else {
      res.status(500).json({ message: "Password tidak valid" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateName = async (req, res) => {
  const userId = req.params.id
  const { new_name } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
    })

    if (new_name.toLowerCase() === user.name) {
      res.status(500).json({ message: "Tidak ada perubahan pada nama" })
    } else {
      user.name = new_name.toLowerCase()
      await user.save();
      res.status(200).json({ message: "Updated successfully", user })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" })
  }
}

