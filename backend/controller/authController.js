const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

//api/messenger/user-register
module.exports.userRegister = async (req, res) => {
  //TODO: add validation check for the unique user name

  //if unique then create a new user in th DB.
  try {
    const userData = await User.create(req.body);
    if (userData) {
      //create the token
      const token = jwt.sign(
        {
          id: userData.id,
          email: userData.email,
          username: userData.username,
          profileimage: userData.profile_pic_path,
          registerDateTime: userData.created_at,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRE_DATE,
        }
      );

      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE_DATE * 24 * 60 * 60 * 1000
        ),
      };
      res.status(200).cookie("authToken", token, options).json({
        successMess: "Sign Up is successful",
        user: userData,
        token,
      });
    } else {
      res.status(400).json({
        error: {
          message: "User registeration failed.",
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userLogged = await User.findOne({
      where: { username: username },
    });

    if (!userLogged) {
      res
        .status(400)
        .json({ message: "Incorrect username,  please try again" });
      return;
    }

    const validPassword = await userLogged.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    const token = jwt.sign(
      {
        id: userLogged.id,
        email: userLogged.email,
        username: userLogged.username,
        profileimage: userLogged.profile_pic_path,
        registerDateTime: userLogged.created_at,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRE_DATE,
      }
    );

    const options = {
      Path: "/",
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE_DATE * 24 * 60 * 60 * 1000
      ),
    };
    res.status(200).cookie("authToken", token, options).json({
      successMess: "Login is successful",
      userData: userLogged,
      token,
    });

    //res.status(200).json({ userData: userLogged });
  } catch (err) {
    res.status(400).json({
      error: {
        errormessage: "Failed to Login",
      },
    });
  }
};

module.exports.userLogout = (req, res) => {
  res.status(200).cookie("authToken", "").json({
    success: true,
  });
};

module.exports.deleteUser = async (req, res) => {
  // delete a category by its `id` value
  try {
    console.log("Delete user: ", req.params.id);
    const UserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!UserData) {
      res.status(404).json({ message: "No message found with this id!" });
      return;
    }

    res.status(200).json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports.updateUser = async (req, res) => {
  // delete a category by its `id` value
  try {
    console.log("Updating User", req.params.id, req.body.profile_pic_path);
    const UserData = await User.update(
      {
        profile_pic_path: req.body.profile_pic_path,
      },
      {
        logging: console.log,
        where: {
          id: req.params.id,
        },
      }
    );

    if (!UserData) {
      res.status(404).json({ message: "No User found with this id!" });
      return;
    } else {
      console.log("After Update", UserData);
    }

    res.status(200).json(UserData);
  } catch (err) {
    res.status(500).json(err);
  }
};
