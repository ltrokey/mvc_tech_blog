const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { errorHandler, notFoundHandler } = require("../utils/helpers");

// TODO Import custom middleware ('./utils/auth)

router.get("/", async (req, res, next) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "created_at", "updated_at", "title", "body"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "created_at", "text"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

//TODO GET one Comment, add in middleware for login

module.exports = router;
