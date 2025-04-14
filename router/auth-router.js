const express = require('express');
const authController = require('../controllers/auth-controller');
const { validate } = require('../middlewares/validate-middileware');
const { signupSchema } = require('../validators/auth-validator');
const router = express.Router();



router.route("/").get(authController.home);

router.route("/register").post( validate (signupSchema), authController.register);
router.route("/login").post(authController.login);

module.exports = router;