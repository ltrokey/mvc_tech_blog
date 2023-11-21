const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const { errorHandler, notFoundHandler } = require("../../utils/helpers");

router.use("/api", apiRoutes);
router.use("/home", homeRoutes);
router.use("/dashboard", dashboardRoutes);

router.use(notFoundHandler);
router.use(errorHandler);

module.exports = router;
