const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE New Comment
router.post("/", withAuth, async (req, res) => {
  try {
    const { text, post_id } = req.body;

    if (!text || !post_id) {
      return res.status(400).json({ error: "Text and post_id are required." });
    }

    await Comment.create({
      text,
      user_id: req.session.user_id,
      post_id,
    });

    res.redirect(`/post/${post_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new comment." });
  }
});

module.exports = router;
