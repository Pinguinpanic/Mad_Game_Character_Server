var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Battle = require('../models/battle');
var Item = require('../models/item');
var router = express.Router();


var battle=(new Battle({
	id: 0,
	date: "2 hours",
	users: [],
	userCount: 0
}));
battle.save();

router.get('/', function (req, res) {
    res.render('index', { user : req.user, battle: battle });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ 
		username : req.body.username,
		trunk : [],
		helmet : [],
		armor : [],
		weapon : [],
		participating : false
	}), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });

});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


/* Account stuff handling */
router.get('/participate', function(req, res){
	if(!req.user.participating)
	{
		req.user.participating=true;
		req.user.save();
		battle.users.push(req.user.username);
		battle.userCount +=1;
		res.render('index', { user : req.user, battle: battle });
	}
});

router.get('/un-participate', function(req, res){
	if(req.user.participating)
	{
		req.user.participating=false;
		req.user.save();
		var index = battle.users.indexOf(req.user.username);
		if(index>-1)
		{
			battle.users.splice(index,1);
			battle.userCount -=1;
		}
		res.render('index', { user : req.user, battle: battle });
	}

});

router.get('/add-random', function(req, res){
	var dildo =(new Item({
		name: "Dildo",
		type: "Weapon",
		damage: 1,
		armor: 0
	}));
	var stick =(new Item({
		name: "Stick",
		type: "Weapon",
		damage: 1,
		armor: 0
	}));
	var sabre =(new Item({
		name: "Sabre",
		type: "Weapon",
		damage: 3,
		armor: 0
	}));
	var integraalhelm =(new Item({
		name: "Integraalhelm",
		type: "Helmet",
		damage: 1,
		armor: 2
	}));
	var armor =(new Item({
		name: "Seal Fur",
		type: "Helmet",
		damage: 0,
		armor: 3
	}));
	
	var items = [dildo,stick,sabre,integraalhelm,armor];
	req.user.trunk.push(items[Math.floor(Math.random()*5)]);
	req.user.save();
	res.render('index', { user : req.user, battle: battle });
});


module.exports = router;
