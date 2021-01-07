const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const middleware = require("../middleware");

router.get("/", (req, res) => {
  //Get all posts from DB
  Post.find({}, (err, allposts) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      res.render("posts/index", {
        posts: allposts.reverse(),
        currentUser: req.user,
      });
    }
  });
});

//CREATE- add new post to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // add new post
  var name = req.body.name;
  var imageUrl = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };

  var newPost = {
    name: name,
    image: imageUrl,
    description: desc,
    author: author,
  };
  //Save to database
  Post.create(newPost, (err, newlyCreated) => {
    if (err) {
      console.log("Error in inserting into DB");
    } else {
      res.redirect("/posts");
    }
  });
});

//NEW - show form to create new posts
router.get("/publish", middleware.isLoggedIn, (req, res) => {
  res.render("posts/new");
});

//SHOW - render show template with given id
router.get("/:id", function (req, res) {
  //find the post with provided id
  Post.findById(req.params.id)
    .populate("comments")
    .exec((err, foundPost) => {
      if (err) {
        console.log("Error occurced in finding ID");
      } else {
        //render show template with that post
        res.render("posts/show", { post: foundPost });
      }
    });
});

//=================EDIT POST ROUTE=====================
router.get("/:id/edit", middleware.checkPostOwnership, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    res.render("Posts/edit", { post: foundPost });
  });
});

//UPDATE POST ROUTE
router.put("/:id", middleware.checkPostOwnership, (req, res) => {
  //find and update
  Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//DESTROY POST ROUTE
router.delete("/:id", middleware.checkPostOwnership, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/posts");
    } else {
      res.redirect("/posts");
    }
  });
});

module.exports = router;
