const router = require('express').Router();
const { User } = require("../../models")
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        })

        req.session.save(() => {
            req.session.loggedin = true

            res.status(200).json(dbUserData)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            }
        })

        if (!dbUserData) {
            res.status(400).json({"message": "Incorrect username or password, please try again."})
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({"message": "Incorrect username or password, please try again."})
            return;
        }

        req.session.save(() => {
            req.session.loggedin = true;

            res.status(200).json({user: dbUserData, message: "You are now logged in!"});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedin) {
        req.session.destroy(() => {
            res.status(200).json({ message: "Logout successful, see you soon!" });
        });
    } else {
        res.status(404).json({ message: "No user currently logged in." });
    }
});

module.exports = router;