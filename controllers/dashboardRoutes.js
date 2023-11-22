const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { errorHandler, notFoundHandler } = require("../utils/helpers");
const withAuth = require('../utils/auth');

module.exports = router;