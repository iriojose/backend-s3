import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController";

router.post("/login", function (req, res) {
  return UserController().login(req,res);
});

router.post("/signup", function (req, res) {
  return UserController().signup(req,res);
});

router.post("/forgotOTP", function (req, res) {
  return UserController().forgotPasswordOTP(req,res);
});

router.post("/forgot", function (req, res) {
  return UserController().forgotPassword(req,res);
});

export default router;