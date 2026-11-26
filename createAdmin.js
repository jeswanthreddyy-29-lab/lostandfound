
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = "Campus Admin";

    if (!email || !password) {
      throw new Error("Admin email or password missing in .env");
    }

    if (password.length < 6) {
      throw new Error("Admin password must be at least 6 characters");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "admin"
      },
      { new: true, upsert: true, runValidators: true }
    );

    console.log("Admin account created successfully!");
    console.log("Admin email:", admin.email);
    console.log("Admin role:", admin.role);

  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
