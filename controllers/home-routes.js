const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// GET ALL POSTS @ homepage

router.get("/", (req, res) => {
    Post.findAll({
        include: [User]
    })
    .then((dbPostData) => {
        const allPosts = dbPostData.map((post) => post.get({
            plain: true
        }));
        res.render("all-posts", { allPosts });
    })
    .catch((err) => {
        res.status(500).json(err);
    })
})


// GET ONE POST BY ID

router.get("/post/:id", (req, res) => {

    Post.findByID({
        include: [
            User,
            {
                model: Comment,
                include: [User]
            }
        ]
    })
    .then((dbPostData) => {
        if (dbPostData) {
            const onePost = dbPostData.get({ plain: true });
            res.render("single-post", {onePost});
        }
        else {
            res.status(404).end();
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// GET LOGIN
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    
    res.render("login");
});

// GET SIGNUP

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    
    res.render("signup");
});

// module exports

module.exports = router;