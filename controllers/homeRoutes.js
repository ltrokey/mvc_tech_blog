const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { errorHandler, notFoundHandler } = require("../utils/helpers");
const withAuth = require("../utils/auth");

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

    const post = dbPostData.get({ plain: true });

    res.render("singlePost", {
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

module.exports = router;
