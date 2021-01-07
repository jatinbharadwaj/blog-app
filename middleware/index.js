const Post = require("../models/post");
const Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkPostOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Post.findById(req.params.id, (err, foundPost) => {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the post checking
        if (foundPost.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
