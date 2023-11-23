const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { errorHandler, notFoundHandler } = require("../../utils/helpers");
const withAuth = require("../../utils/auth");

// CREATE New Post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });

    const dbUser = await User.findByPk(req.session.user_id);

    if (!dbUser) {
      return notFoundHandler(req, res, next);
    }

    const dbUserPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "created_at", "updated_at", "title", "body"],
      include: [
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

    const user = dbUser.get({ plain: true });
    const userPosts = dbUserPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      user,
      userPosts,
      loggedIn: req.session.loggedIn,
      loggedIn: true,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});

module.exports = router;
