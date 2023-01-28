const express = require('Express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get("/:user_id", userControllers.findById)
// router.patch("/:user_id")

module.exports = router;