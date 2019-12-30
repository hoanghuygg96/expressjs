const express = require("express");
const multer = require("multer");

const controllers = require("../controllers/user.controller");
const router = express.Router();
const validate = require("../validate/user.validate");

const upload = multer({ dest: "./public/uploads/" });

router.get("/", controllers.index);

router.get("/search", controllers.search);

router.get("/create", controllers.create);

router.get("/:id", controllers.get);

router.post(
  "/create",
  upload.single("avatar"),
  validate.postCreate,
  controllers.postCreate
);

module.exports = router;
