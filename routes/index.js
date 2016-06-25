var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Battle = require('../models/battle');
var Item = require('../models/item');
var Items = require("../declarations/items.js");
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
		if(battle.userCount <= 1)
		{
			battle.battleLog+="Nothing happens"
		}
		else
		{
			var choose = function(array)
			{
				return array[Math.floor(Math.random()*array.length)];
			}
			var die = function(actor,battle)
			{
				if(Math.random()*-50>Math.random()*actor.hp)
				{
					actor.user.weapon=[];
					actor.user.armor=[];
					actor.user.helmet=[];
					actor.user.totalarmor=0;
					actor.user.totaldamage=0;
					if(hp<-20)
					{
						battle.battleLog.push(actor.user.username+choose([" was absolutely pulverized."," was turned into a bloody pulp."," has been brutally massacred."]));
					}
					else if(hp<-10)
					{
						battle.battleLog.push(actor.user.username+choose([" was torn in half.", " has hacked into mutliple parts."," is very dead."]));
					}
					else
					{
						battle.battleLog.push(actor.user.username+choose([" has died."," dies.","has been deaded."," is dead.","has joined the afterlife"]));
					}
				}
				else
				{
					battle.battleLog.push(actor.user.username+choose([" was knocked unconscious."," falls on the floor in pain."," goes down."," succumbs to his wounds."," hits the floor unconsious"," goes out."]));
				}
			}
			var attack = function(actor,target,battle)
			{
				if(1.2*Math.random()*actor.user.totalDamage<(Math.random()*target.user.totalArmor+Math.random()*target.user.totalDamage))
				{
					battle.battleLog.push(actor.user.username+choose([
						" tries to slash "," takes a jab at "," swings his "+actor.weapon+" at ", " flings his "+actor.weapon+" at "
					])+target.user.username+choose([
						", but he parries.",", but he blocks with his " +target.weapon+"."," but the hit is parried by his "+target.weapon+"."," but he deflects it.", " but he dodges."
					]));
					if(Math.random()>0.8)
					{
						battle.battleLog.push(target.user.username+choose([" makes a counter-attack."," makes a quick counter-move."," counters."]));
						attack(target,actor,battle);	
					}
				}
				else
				{
					if(Math.random()>0.3)
					{
						target.hp-=Math.round(Math.random()*actor.dmg);
						battle.battleLog.push(actor.user.username+choose([
							" slashes "," takes a jab at"," connects a swing to "," deals a blow with his "+actor.weapon+" to", " flings his "+actor.weapon+" at"
						])+target.user.username+".");
					}
					else
					{
						battle.battleLog.push(actor.user.username+choose([
							" misses "," barely misses ", 
						])+target.user.username+".");
					}
				}
			}
			var shuffle = function(array) {
				var counter = array.length;
    				while (counter > 0) {
				        var index = Math.floor(Math.random() * counter);
				        counter--;
        				var temp = array[counter];
				        array[counter] = array[index];
				        array[index] = temp;
			    }
			    return array;
			}

			//All join the fight
			//console.log("Joining all");
			var battleActors = [];
			for( i in battleDudes )
			{
				var dude = battleDudes[i];
				battle.battleLog.push(dude.username + " joins the fights.");
				var newActor = {user: dude, hp: dude.totalarmor+20, dmg: dude.totaldamage+20};
				if(dude.weapon.length>0)
				{
					newActor.weapon = dude.weapon[0].name;
				}
				else
				{
					"bare hands";
				}
				battleActors.push(newActor);
			}
			while(battleActors.length>1)
			{
				//console.log("Taking battle step");
				battleActors = shuffle(battleActors);
				var remove = [];
				//All take a slash
				for(i in battleActors)
				{
					var actor = battleActors[i];
					//console.log(actor.user.username+" takes a move");
					//Not always slash
					if(Math.random()>0.8 && actor.hp>0)
					{
						//Pick target
						var targetables = battleActors.slice(0);
						targetables.splice(i,1);
						targetables=shuffle(targetables);
						var target = targetables[0];
						//Make an attack
						attack(actor,target,battle);
						if(target.hp<=0)
						{
							die(target,battle);
							remove.push(target);
						}
					}
				}
				for(i in remove)
				{
					//console.log("Removing user");
					battleActors.splice(battleActors.indexOf(remove[i]));
				}
			}
		}
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
