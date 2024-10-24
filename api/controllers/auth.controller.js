import bcrypt from "bcrypt";
import User from "../models/user.modal.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created Successfully" });
  } catch (err) {
    console.log("Error: ", err);
  }

  console.log(req.body); // Logs the request body
  //   return res.status(200).json({ message: "Signup route hit successfully" });
};
