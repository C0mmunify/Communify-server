const express = require('Express');
const router = express.Router();
const path = require('path');
const userControllers = require('../controllers/userControllers');

router.get("/:user_id", userControllers.findById)
// router.patch("/:user_id")



module.exports = router;
