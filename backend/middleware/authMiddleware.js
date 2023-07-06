const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  console.log(req.cookie);
  next();

  //   const { authToken } = req.cookies;
  //   if (authToken) {
  //     const decodeToken = await jwt.verify(authToken, process.env.SECRET_KEY);

  //     req.myid = decodeToken.id;
  //     next();
  //   } else {
  //     res.status(400).json({
  //       error: {
  //         errorMessage: ["Invalid token, PLease login first"],
  //       },
  //     });
  //   }
};
