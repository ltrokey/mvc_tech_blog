const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { errorHandler, notFoundHandler } = require("../utils/helpers");

router.get("/", async (req, res, next) => {
  try {
    const dbPostsData = await Post.findAll({
      attributes: ["id", "created_at", "updated_at", "title", "body"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "created_at", "text", "user_id", "post_id"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = dbPostsData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

router.get("/post/:id", async (req, res, next) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      attributes: ["id", "created_at", "updated_at", "title", "body"],
      include: [
        {
          model: User,
          attributes: ["id","username"],
        },
        {
          model: Comment,
          attributes: ["id", "created_at", "text", "user_id", "post_id"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    const user = await User.findByPk(req.session.user_id);
    const usersPost = post.user.id == user.id

    res.render("singlePost", {
      usersPost,
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signUp", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signUp");
});

router.get("/createPost", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("createPost", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
