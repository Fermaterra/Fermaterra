const { Router } = require("express");

const emailRouter = Router();

const { sendEmail } = require("../controllers/emailController");

emailRouter.route("/")
  .post(sendEmail);

module.exports = emailRouter;
