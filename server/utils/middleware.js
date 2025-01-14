const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function authorize (req, res, next) {
  let user;
  let nameOfUser;
  // Get token from header
  const token = req.header("Authorization");
  // const token = authHeader && authHeader.split('')[1];

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);

    res.user = verify;
    console.log(res.user)

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};