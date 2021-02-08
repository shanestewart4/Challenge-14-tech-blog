const router = require("express").Router();
const { Post } = require("../models/");

// authorization to create, edit posts
const withAuth = require("../utils/auth");


router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            userID: req.session.userID
        }
    })
    .then((dbPostData) => {
        const allUserPosts = dbPostData.map((post) => post.get({
            plain: true
        }));
        res.render("all-posts-admin", {
            layout: "dashboard",
            allUserPosts
        });
    })

    .catch((err) => {
        console.log(err);
        res.redirect("login");
    });
});


// NEW POST

router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard"
    });
});

// EDIT POST -- use Post key
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPK(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const blogPost = dbPostData.get({ plain: true});
                res.render("edit-post", {
                    layout: "dashboard",
                    blogPost
                });
            }
            else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// module exports

module.exports = router;
