const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const { errorHandler, notFoundHandler } = require("../../utils/helpers");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

router.use(notFoundHandler);
router.use(errorHandler);

module.exports = router;
