const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

const Wine = require('../database/models/wine')

router.post('/signup', (req, res) => {
    console.log('user signup');
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            console.log("already a user with that name")
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/currentuser', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})
router.post('/currentuser/info', (req, res) => {
    const username = req.body.username
    console.log(username)
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err)
        } else if (user) {
            res.json(user._id)
        }
    })
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})
//wine routes specific
router.post('/wines/newwine', (req, res) => {
    //const {userid,name,number,color} = req.body
    var newWine = new Wine(req.body)
    newWine.save()
        .then(data => {
            res.send('Item saved to database' + data)
        })
        .catch(err => {
            res.status(400).send('Unable to save')
        })
})
router.get('/wines/:userid', (req, res) => {
    const userid = req.params.userid
    //console.log(userid)
    Wine.find({ userid: userid }, function (err, wine) {
        if (err) {
            console.log(err)
        } else {
            res.json(wine)
        }
    })
})
router.get('/wines', (req, res) => {
    Wine.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.statusCode()
        })
})
/*Old
router.get('/wines/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    Wine.findById(id, function (err, wine) {
        res.json(wine);
    });
})*/
router.get('/wines/find/:id', (req,res) => {
    Wine.findById({_id: req.params.id}, function(err,wine){
        res.json(wine)
    })
    .catch(err => console.log(err))
})
router.get('/wines/delete/:id', (req, res) => {
    Wine.findByIdAndRemove({ _id: req.params.id }, function (err, wine) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
})
router.post('/wines/update/:id', (req, res) => {
    Wine.findById(req.params.id, function (err, wine) {
        if (!wine) {
            res.status(404).send("data is not found");
        }
        else {
            wine.userid = req.body.userid;
            wine.name = req.body.name;
            wine.country = req.body.country;
            wine.vintage = req.body.vintage;
            wine.region = req.body.region;
            wine.varietal = req.body.varietal
            wine.pairing = req.body.pairing
            wine.notes = req.body.notes
            wine.quantity = req.body.quantity
            wine.cellocation = req.body.cellocation
            wine.save().then(wine => {
                res.json('Wine updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
})
module.exports = router