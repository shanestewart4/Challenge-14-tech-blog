const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");


// POST request
router.post("/", withAuth, (req, res) => {
    const postBody = req.body;
    console.log(req.session.userID);
    Post.create({ ...postBody, userID: req.session.userID})
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// PUT request
router.put("/:id", withAuth, (req, res) => {

    Post.update(req.body, {
        where: { id: req.params.id },
    })
        .then(editedRows => {
            if (editedRows > 0) {
                res.status(200).end();
            }
            else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// DELETE request
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: { id: req.params.id }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
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