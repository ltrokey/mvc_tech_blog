const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const { errorHandler, notFoundHandler } = require("../../utils/helpers");
const withAuth = require("../../utils/auth");

// CREATE New Post
router.post("/", withAuth, async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
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
      attributes: ["id", "created_at", "updated_at", "title", "content"],
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
    res.status(500).json({ error: "Failed to create a new post." });
  }
});

//EDIT a Post
router.put("/:id", withAuth, async (req, res) => {
  try {
    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        updated_at: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ message: "Post updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the post." });
  }
});

module.exports = router;
