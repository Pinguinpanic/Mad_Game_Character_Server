var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Battle = require('../models/battle');
var Item = require('../models/item');
var Items = require("../declarations/items.js");
var BattleSimulation = require("../declarations/battle-simulation.js");
var router = express.Router();


var battle=(new Battle({
	date: "upcoming",
	participaters: [],
	users: "{}",
	userCount: 0,
	battleLog: []
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
		totalarmor : 0,
		totaldamage : 0,
		battles : [],
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
		battle.participaters.push(req.user._id);
		console.log("Participating in : "+JSON.stringify(battle));
		battle.userCount +=1;
		res.render('index', { user : req.user, battle: battle });
	}
});

router.get('/un-participate', function(req, res){
	if(req.user.participating)
	{
		req.user.participating=false;
		req.user.save();
		var index = battle.participaters.indexOf(req.user._id);
		if(index>-1)
		{
			battle.participaters.splice(index,1);
			battle.userCount -=1;
		}
		res.render('index', { user : req.user, battle: battle });
	}

});


router.get('/add-random/:tier', function(req, res){
	
	var tier = req.params.tier;
	var tierItems = Items.tier(tier);
	req.user.trunk.push(tierItems[Math.floor(Math.random()*tierItems.length)]);
	req.user.save();
	res.render('index', { user : req.user, battle: battle });
});

router.get('/equip/:id', function(req, res){
	var id= req.params.id;
	var index = -1;
	var newItem= -1;
	for(var i in req.user.trunk)
	{
		var item=req.user.trunk[i];
		if(item._id == id)
		{
			if(item.type == "Weapon")
			{
				if(req.user.weapon.length==0)
				{
					req.user.weapon.push(item);
					index = i;
					break;
				}
				else
				{
					newItem=req.user.weapon[0];
					req.user.weapon=[item];
					index =i;
					break;
				}
			}
			if(item.type == "Armor")
			{
				if(req.user.armor.length==0)
				{
					req.user.armor.push(item);
					index = i;
					break;
				}
				else
				{
					newItem=req.user.armor[0];
					req.user.armor=[item];
					index =i;
					break;
				}
			}
			if(item.type == "Helmet")
			{
				if(req.user.helmet.length==0)
				{
					req.user.helmet.push(item);
					index = i;
					break;
				}
				else
				{
					newItem=req.user.helmet[0];
					req.user.helmet=[item];
					index =i;
					break;
				}
			}
		}
	}
	if(index!=-1)
	{
		req.user.trunk.splice(index,1);
	}
	if(newItem!=-1)
	{
		req.user.trunk.push(newItem);
	}
	var totalarmor=0;
	var totaldamage=0;
	if(req.user.weapon.length>0)
	{
		totalarmor+=req.user.weapon[0].armor;
		totaldamage+=req.user.weapon[0].damage;
	}
	if(req.user.armor.length>0)
	{
		totalarmor+=req.user.armor[0].armor;
		totaldamage+=req.user.armor[0].damage;
	}
	if(req.user.helmet.length>0)
	{
		totalarmor+=req.user.helmet[0].armor;
		totaldamage+=req.user.helmet[0].damage;
	}
		
	req.user.totalarmor=totalarmor;
	req.user.totaldamage=totaldamage;

	req.user.save();
	//res.redirect("/");
	res.render('index', { user : req.user, battle: battle });
})

router.get('/unequip/:id', function(req, res){
	var id= req.params.id;
	if(id == 0)
	{
		req.user.trunk.push(req.user.helmet[0]);
		req.user.helmet=[];
	}
	if(id == 1)
	{
		req.user.trunk.push(req.user.armor[0]);
		req.user.armor=[];
	}
	if(id == 2)
	{
		req.user.trunk.push(req.user.weapon[0]);
		req.user.weapon=[];
	}
	
	//Reculculate armor
	var totalarmor=0;
	var totaldamage=0;
	if(req.user.weapon.length>0)
	{
		totalarmor+=req.user.weapon[0].armor;
		totaldamage+=req.user.weapon[0].damage;
	}
	if(req.user.armor.length>0)
	{
		totalarmor+=req.user.armor[0].armor;
		totaldamage+=req.user.armor[0].damage;
	}
	if(req.user.helmet.length>0)
	{
		totalarmor+=req.user.helmet[0].armor;
		totaldamage+=req.user.helmet[0].damage;
	}
		
	req.user.totalarmor=totalarmor;
	req.user.totaldamage=totaldamage;

	req.user.save();
	//res.redirect("/");
	res.render('index', { user : req.user, battle: battle });
})

//ADMIN STUFF
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

router.get('/fight', function(req, res){
	battle.date = getDateTime();
	var done = 0;
	Account.find(function(err,accounts)
	{
		console.log("Simulating fight");
		var battleDudes = [];
		for( i in accounts)
		{
			var found = accounts[i];
			//Skip ahead if not in
			if(battle.participaters.indexOf(found._id)==-1) continue;
			//console.log("Adding participater:" +found.username);
			battleDudes.push(found);
			found.participating = false;
			found.save();	
		}
		//START ---------------_GENERATE BATTLE LOG HERE----------------------

		var result = BattleSimulation.play(battle,battleDudes);
		battle = result.battle;
		battleDudes = result.battleDudes;

		//END   ---------------_GENERATE BATTLE LOG HERE----------------------
		battle.users=JSON.stringify(battleDudes);
		//console.log("Finished battle :"+JSON.stringify(battle));
		battle.save();
		for( i in battleDudes)
		{
			var dude = battleDudes[i];
			dude.battles.push(battle);
			//console.log("Added battle result to: "+JSON.stringify(dude));
			dude.save();
		}
		var prevBattle = battle;
		battle=(new Battle({
			id: 0,
			date: "upcoming",
			users: "{}",
			participaters: [],
			userCount: 0,
			battleLog: []
		}));
	
		res.json(prevBattle);
	});
});

router.get('/battles', function(req,res) {
	Battle.find(function(err, battles)
	{
		var myBattles = [];
		for(i in battles)
		{
			var found = battles[i];
			//Skip if not in
			if(req.user.battles.indexOf(found._id)==-1) continue;	
			myBattles.push(found);
		}
		res.json(myBattles);
	});
});

module.exports = router;
