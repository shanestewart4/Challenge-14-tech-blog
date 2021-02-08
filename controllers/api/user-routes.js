const router = require("express").Router();
const { User } = require("../../models");


// POST request

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userID = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST login request

router.post("/", (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'User not found. Please check your credentials and try again!'});
            return;
        }

        const validPass = dbUserData.checkPassword(req.body.password);

        if (!validPass) {
            res.status(404).json({ message: 'Incorrect password. Try Again!'});
            return;
        }

        req.session.save(() => {
            req.session.userID = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'Login Success!'});
        });
    });
});


// POST logout request

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// DELETE user request

router.delete('/user/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res,status(500).json(err);
    });
});

// module exports

module.exports = router;


