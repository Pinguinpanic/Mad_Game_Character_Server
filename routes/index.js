var express = require('express');
var passport = require('passport');
var sse = require('sse') ;
var Account = require('../models/account');
var Battle = require('../models/battle');
var Item = require('../models/item');
var Items = require("../declarations/items.js");
var Level = require('../declarations/level.js');
var BattleSimulation = require("../declarations/battle-simulation.js");
var router = express.Router();



var connections = [];

var lastFight = new Date().getTime();

var battle=(new Battle({
	date: "upcoming",
	participaters: [],
	userCount: 0,
	battleLog: []
}));
battle.save();

function refreshAll() {
	for(var i = 0; i < connections.length; i++) {
		console.log('Refreshing '+connections[i]);
		connections[i].write('data: hallo \n\n');
	}
}

router.get('/stream', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	})
	connections.push(res);
	console.log('Registered user '+connections.length);
});

router.get('/', function (req, res) {
    res.render('index', { user : req.user, battle: battle });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ 
		username : req.body.username,
		colour: rc(),
		trunk : [],
		helmet : [],
		armor : [],
		weapon : [],
		totalarmor : 0,
		totaldamage : 0,
		level : 0,
		xp : 0,
		nextxp : Level.getXpForLvl(1),
		battles : [],
		lastBattle : [],
		participating : false,
		fresh: false
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
	req.user.trunk.push(Items.getLoot(tier));
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

router.get('/open/:id', function(req, res) {
	var id = req.params.id;
	for(var i in req.user.trunk)
	{
		var item=req.user.trunk[i];
		if(item._id == id)
		{
			item.fresh = false;
		}
	}
	req.user.save();
	res.render('index', { user : req.user, battle: battle });
})

router.get('/revive', function(req, res) {
	req.user.fresh = false;
	req.user.save();
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
//TODO: MOVE ALL HELPER FUNCTIONS TO THEIR OWN SPACE
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

router.get('/fight', function(req, res){

	battle.date = getDateTime();
	var done = 0;
	//Don't do useless fight
	if(battle.userCount<2)
	{
		console.log("Not enough participants for fight");
		return;
	}
	Account.find(function(err,accounts)
	{
		
		if(err)
		{
			console.log(err);
			next(err);
		}
		if(new Date().getTime()<lastFight+5000)
		{
			console.log("Fight still on cooldown");
			return;
		}
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
		
		battleDudes=uniq(battleDudes);
		//START ---------------_GENERATE BATTLE LOG HERE----------------------
		var result = BattleSimulation.play(battle,battleDudes);
		console.log("Getting simulation");
		//console.log(JSON.stringify(result));
		battle = result.battle;
		battleDudes = result.battleDudes;
		var winner = result.winner;
		
		//Give Loot To Winner
		if(winner!=undefined)
		{
			//console.log("Winner is"+winner);
			winner.trunk.push(Items.getLeveledLoot(winner.level));
			
			//console.log("Winner trunk:"+winner);
			//winner.save();//HIER ZIT DE FOUT
		}
		else
		{
			console.log("Winner is undefined");
		}
		
		//END   ---------------_GENERATE BATTLE LOG HERE----------------------
		//console.log("Finished battle :"+JSON.stringify(battle));
		//battle.save(); Ook fout
		for( i in battleDudes)
		{
			var dude = battleDudes[i];
			dude.battles.push(battle);
			dude.lastBattle = battle;
			//console.log("Added battle result to: "+JSON.stringify(dude));
			//dude.save(); Ook fout
		}
		var prevBattle = battle;
		battle=(new Battle({
			date: "upcoming",
			participaters: [],
			userCount: 0,
			battleLog: []
		}));
		//console.log("Added new Battle");
		lastFight=new Date().getTime();
		
		//console.log("Redirecting to last battle");
		
		//res.json(accounts);
		res.redirect("/");
		refreshAll();
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

router.get('/refresh', function(req,res) {
	res.render('index', { user : req.user, battle: battle });
});

function rc()
{
	return "#"+((1<<24)*Math.random()|0).toString(16)
}

module.exports = router;
