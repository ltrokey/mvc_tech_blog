const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { errorHandler, notFoundHandler } = require("../utils/helpers");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res, next) => {
  console.log("Dashboard route accessed");
  try {
    const dbUserPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "created_at", "updated_at", "title", "content"],
      order: [["updated_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "created_at", "text", "user_id", "post_id"],
          order: [["created_at", "DESC"]],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const user = await User.findByPk(req.session.user_id);

    const userPosts = dbUserPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      user: user.get({ plain: true }),
      userPosts,
      loggedIn: true,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

module.exports = router;
