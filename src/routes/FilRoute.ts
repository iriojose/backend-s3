import express from "express";
const router = express.Router();
import FileController from '../controllers/FileController';
import policy from '../utils/policy';

router.post("/upload",policy, function (req, res) {
  return FileController().UploadFile(req,res);
});

router.post("/download", policy, function (req, res) {
  return FileController().DownloadFile(req,res);
});

router.post("/uploadUrl", policy, function (req, res) {
  return FileController().UploadFileToS3WithUrl(req,res);
});

router.get("/getAll", policy, function (req, res) {
  return FileController().GetAllFiles(req,res);
});

router.get("/searchImages", policy, function (req, res) {
  return FileController().SearchImageByUnplash(req,res);
});


export default router;