const express = require("express");
const router = express.Router();
const {
  createBlogs,
  updateBlogsByVotes,
  retrieveblogs,
  deleteById,
  updateById,
  updateBlogComments,
} = require("../controllers/blogsController");
const loggedIn = require("../middlewares/loggedIn");
const authorization = require("../middlewares/authorization");
const votingAuthorization = require("../middlewares/votingAuthorization");

router.post("/",loggedIn, createBlogs);
router.get("/", retrieveblogs);
router.delete("/:id", loggedIn, authorization, deleteById);
router.patch("/:id", loggedIn, authorization, updateById);
router.patch("/comments/:id", loggedIn, authorization, updateBlogComments);
router.patch("/vote/:id", loggedIn, votingAuthorization, updateBlogsByVotes);

module.exports = router;
