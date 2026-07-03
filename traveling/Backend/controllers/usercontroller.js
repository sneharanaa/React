const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const usermodel = require("../models/user");
const otpmodel = require("../models/otp");
const personmodel = require("../models/person");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const sendEmail = require("../utils/sendEmail");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const usersignup = async (req, res) => {
  let { username, contact, email, password } = req.body;
  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use!" });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ message: "Error in hashing password!" });

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).json({ message: "Error in hashing password!" });

        const user = await usermodel.create({ username, contact, email, password: hash });

        let token = jwt.sign({ email: email, userid: user._id }, process.env.USER_S_KEY);
        await user.save();
        res.cookie("token", token);
        res.status(201).json({ status: true, message: "User registered." });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again." });
  }
};

const userlogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email or password is incorrect!" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords!" });

      if (result) {
        let token = jwt.sign({ email: email, userId: user._id }, process.env.USER_S_KEY);
        return res.json({
          status: true,
          message: "Login successful!",
          token: token,
          userId: user._id,
        });
      } else {
        res.status(400).json({ message: "Email or password is incorrect!" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again." });
  }
};

const userlogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful!" });
};

const userbooking = async (req, res) => {
  try {
    const {
      numberOfPeople,
      personNames,
      personNumber,
      foodType,
      paymentMethod,
      paymentDetails,
      totalCharge,
      userId,
      tripId,
    } = req.body;

    if (personNames.length !== numberOfPeople || personNumber.length !== numberOfPeople) {
      return res.status(400).json({ message: "Mismatch between number of people and the provided details." });
    }

    const newBooking = new personmodel({
      numberOfPeople,
      personNames,
      personNumber,
      foodType,
      paymentMethod,
      paymentDetails,
      totalCharge,
      userId,
      tripId,
    });

    await newBooking.save();

    res.json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "There was an error with your booking" });
  }
};

const personid = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid person ID" });

    const latestBooking = await personmodel
      .findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("userId", "username contact email")
      .populate("tripId", "placename charge mode days date")
      .select("numberOfPeople personNames personNumber foodType paymentMethod paymentDetails totalCharge tripId")
      .exec();

    if (!latestBooking) return res.status(404).json({ message: "No bookings found for this user." });
    res.json([latestBooking]);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const booking = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid person ID" });

    const bookings = await personmodel
      .find({ userId })
      .populate("userId", "username contact email")
      .populate("tripId", "placename charge mode days date")
      .select("numberOfPeople personNames foodType paymentMethod paymentDetails totalCharge tripId")
      .exec();

    if (bookings.length === 0) return res.status(404).json({ message: "No bookings found for this user." });

    res.json(bookings);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) return res.status(400).json({ message: 'Invalid booking ID' });

    const deletedBooking = await personmodel.findByIdAndDelete(bookingId);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ message: 'Booking cancelled successfully', deletedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const existingUser = await usermodel.findOne({ email });
  if (!existingUser) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await otpmodel.create({ email, otp });
  await sendEmail(email, otp);

  res.json({ message: "OTP sent successfully" });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const valid = await otpmodel.findOne({ email, otp });

  if (!valid) return res.status(400).json({ message: "Invalid or expired OTP" });

  await otpmodel.deleteOne({ _id: valid._id }); // cleanup after verification
  res.json({ message: "OTP verified" });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await usermodel.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);

  user.password = hashed;
  await user.save();

  res.json({ message: "Password reset successfully" });
};

module.exports = {
  usersignup,
  userlogin,
  userlogout,
  userbooking,
  personid,
  booking,
  cancelBooking,
  sendOTP,
  verifyOTP,
  resetPassword,
};
