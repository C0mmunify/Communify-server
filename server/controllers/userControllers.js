const User = require("../Models/userModel");

async function findById(req, res) {
    //returns an array
    try {
      const users = await User.findById(req.params.user_id);
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json(err.message);
    }
  }
  
module.exports = findById;
