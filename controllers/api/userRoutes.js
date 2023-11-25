const router = require("express").Router();
const { errorHandler, notFoundHandler } = require("../../utils/helpers");
const { User, Post, Comment } = require("../../models");

// CREATE new user
router.post("/signUp", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username.toLowerCase(),
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});

// USER login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});

// USER logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    return notFoundHandler(req, res, next);
  }
});

module.exports = router;
