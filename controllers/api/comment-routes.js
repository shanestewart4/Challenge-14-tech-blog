const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require('../../utils/auth');

// POST COMMENT

router.post("/", withAuth, (req, res) => {
    Comment.create({...req.body, userID: req.session.userID})
    .then(newComment => {
        res.json(newComment);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// module exports

module.exports = router;
