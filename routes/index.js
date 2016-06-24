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
		totalarmor : 0,
		totaldamage : 0,
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

//Generate a set of items
var itemsTier = [[],[],[]];
//Fill tier 1
itemsTier[0].push(new Item({	name: "Jagged Dagger",		type: "Weapon",		damage: 2,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Iron Sword",		type: "Weapon",		damage: 2,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Quarterstaff",		type: "Weapon",		damage: 1,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Iron Axe",		type: "Weapon",		damage: 3,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Pactice Sword",		type: "Weapon",		damage: 1,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Iron Broadsword",	type: "Weapon",		damage: 3,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Iron Halberd",		type: "Weapon",		damage: 3,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Wooden Halberd",		type: "Weapon",		damage: 2,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Iron Mace",		type: "Weapon",		damage: 3,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Wooden Club",		type: "Weapon",		damage: 2,	armor: 0 }));

itemsTier[0].push(new Item({	name: "Fur Vest",		type: "Armor",		damage: 0,	armor: 2 }));
itemsTier[0].push(new Item({	name: "Cloth Vest",		type: "Armor",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Fur Cloak",		type: "Armor",		damage: 0,	armor: 2 }));
itemsTier[0].push(new Item({	name: "Cloth Cloak",		type: "Armor",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Fur Armor",		type: "Armor",		damage: 0,	armor: 3 }));
itemsTier[0].push(new Item({	name: "Wooden Armor",		type: "Armor",		damage: -1,	armor: 2 }));
itemsTier[0].push(new Item({	name: "Spiked Fur Armor",	type: "Armor",		damage: 1,	armor: 3 }));
itemsTier[0].push(new Item({	name: "Bronze Chainmail",	type: "Armor",		damage: 0,	armor: 4 }));
itemsTier[0].push(new Item({	name: "Cloth Shirt",		type: "Armor",		damage: 0,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Cloth Robe",		type: "Armor",		damage: 0,	armor: 1 }));

itemsTier[0].push(new Item({	name: "Fur Cap",		type: "Helmet",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Fur Turban",		type: "Helmet",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Fur Hood",		type: "Helmet",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	name: "Cloth Hood",		type: "Helmet",		damage: 0,	armor: 0 }));
itemsTier[0].push(new Item({	name: "Wooden Mask",		type: "Helmet",		damage: 0,	armor: 1 }));

//Fill tier 2
itemsTier[1].push(new Item({	name: "Poisoned Dagger",	type: "Weapon",		damage: 5,	armor: 0 }));
itemsTier[1].push(new Item({	name: "Steel Sword",		type: "Weapon",		damage: 4,	armor: 2 }));
itemsTier[1].push(new Item({	name: "Katana",			type: "Weapon",		damage: 4,	armor: 3 }));
itemsTier[1].push(new Item({	name: "Steel Battleaxe",	type: "Weapon",		damage: 7,	armor: -1 }));
itemsTier[1].push(new Item({	name: "Steel Rapier",		type: "Weapon",		damage: 4,	armor: 1 }));
itemsTier[1].push(new Item({	name: "Lead Mace",		type: "Weapon",		damage: 6,	armor: -1 }));
itemsTier[1].push(new Item({	name: "Giant Shield",		type: "Weapon",		damage: 0,	armor: 5 }));
itemsTier[1].push(new Item({	name: "Steel Pike",		type: "Weapon",		damage: 5,	armor: 0 }));


itemsTier[1].push(new Item({	name: "Iron Chainmail",		type: "Armor",		damage: -1,	armor: 5 }));
itemsTier[1].push(new Item({	name: "Iron Platemail",		type: "Armor",		damage: -2,	armor: 8 }));
itemsTier[1].push(new Item({	name: "Steel Chainmail",	type: "Armor",		damage: -1,	armor: 6 }));
itemsTier[1].push(new Item({	name: "Iron Platemail",		type: "Armor",		damage: -2,	armor: 9 }));
itemsTier[1].push(new Item({	name: "Spiked Leather Armor",	type: "Armor",		damage: 2,	armor: 4 }));
itemsTier[1].push(new Item({	name: "Leather Cloak",		type: "Armor",		damage: 0,	armor: 3 }));
itemsTier[1].push(new Item({	name: "Leather Armor",		type: "Armor",		damage: 0,	armor: 4 }));

itemsTier[1].push(new Item({	name: "Iron Helmet",		type: "Helmet",		damage: 0,	armor: 2 }));
itemsTier[1].push(new Item({	name: "Iron Full Helmet",	type: "Helmet",		damage: -1,	armor: 3 }));
itemsTier[1].push(new Item({	name: "Steel Helmet",		type: "Helmet",		damage: 0,	armor: 3 }));
itemsTier[1].push(new Item({	name: "Steel Full Helmet",	type: "Helmet",		damage: 0,	armor: 3 }));
itemsTier[1].push(new Item({	name: "Leather Hood",		type: "Helmet",		damage: 0,	armor: 2 }));
itemsTier[1].push(new Item({	name: "Iron Mask",		type: "Helmet",		damage: 0,	armor: 2 }));

//Fill tier 3
itemsTier[2].push(new Item({	name: "Venomous Dagger",	type: "Weapon",		damage: 5,	armor: 0 }));
itemsTier[2].push(new Item({	name: "Double Katana",		type: "Weapon",		damage: 7,	armor: 4 }));
itemsTier[2].push(new Item({	name: "Berserker Battleaxe",	type: "Weapon",		damage: 10,	armor: -2 }));
itemsTier[2].push(new Item({	name: "Balanced Rapier",	type: "Weapon",		damage: 6,	armor: 3 }));

itemsTier[2].push(new Item({	name: "Goldplated Chainmail",	type: "Armor",		damage: -2,	armor: 10 }));
itemsTier[2].push(new Item({	name: "Siege Armor",		type: "Armor",		damage: -3,	armor: 12 }));
itemsTier[2].push(new Item({	name: "Poison Spiked Armor",	type: "Armor",		damage: 2,	armor: 6 }));
itemsTier[2].push(new Item({	name: "Dragonhide Cloak",	type: "Armor",		damage: 0,	armor: 8 }));

itemsTier[2].push(new Item({	name: "Dragonhide Hood",	type: "Helmet",		damage: 1,	armor: 4 }));
itemsTier[2].push(new Item({	name: "Goldplated Full Helm",	type: "Helmet",		damage: -1,	armor: 6 }));
itemsTier[2].push(new Item({	name: "Winged Helm",		type: "Helmet",		damage: 0,	armor: 5 }));

//itemsTier[2].push(new Item({	name: "Delicious Sausage",	type: "Weapon",		damage: 1,	armor: 0 }));

var modifiers = [];
modifiers.push({name:"Heavy", 		damage:-1, 	armor:1,	affect:["Armor","Helmet"]});
modifiers.push({name:"Crappy", 		damage:-1, 	armor:0,	affect:["Weapon"]});
modifiers.push({name:"Frail", 		damage:0, 	armor:-1,	affect:["Armor","Helmet"]});
modifiers.push({name:"Reinforced", 	damage:0, 	armor:1,	affect:["Armor","Helmet"]});
modifiers.push({name:"Shiny", 		damage:0, 	armor:1,	affect:["Weapon","Armor","Helmet"]});
modifiers.push({name:"Engraved", 	damage:0, 	armor:0,	affect:["Weapon","Armor","Helmet"]});
modifiers.push({name:"Royal", 		damage:1, 	armor:1,	affect:["Weapon","Armor","Helmet"]});
modifiers.push({name:"Bloodstained",	damage:0, 	armor:0,	affect:["Weapon","Armor","Helmet"]});
modifiers.push({name:"Grand", 		damage:2, 	armor:2,	affect:["Weapon","Armor","Helmet"]});
modifiers.push({name:"Gilded", 		damage:0, 	armor:0,	affect:["Weapon","Armor","Helmet"]});
modifiers.push({name:"Silly", 		damage:0, 	armor:0,	affect:["Weapon","Armor","Helmet"]});

var endModifiers = [];
endModifiers.push({name:"Pain", 		damage:2, 	armor:0,	affect:["Weapon"]});
endModifiers.push({name:"Destruction",		damage:1, 	armor:0,	affect:["Weapon","Armor","Helmet"]});
endModifiers.push({name:"Agression",		damage:2, 	armor:-1,	affect:["Weapon","Armor","Helmet"]});
endModifiers.push({name:"Reckless Retribution",	damage:4, 	armor:-3,	affect:["Weapon","Armor","Helmet"]});
endModifiers.push({name:"Protection",		damage:0, 	armor:1,	affect:["Weapon","Armor","Helmet"]});
endModifiers.push({name:"the Saint",		damage:-3, 	armor:4,	affect:["Armor","Helmet"]});
endModifiers.push({name:"the Heroic",		damage:-1, 	armor:2,	affect:["Weapon","Armor","Helmet"]});
endModifiers.push({name:"Fear", 		damage:2, 	armor:2,	affect:["Helmet"]});

//For all tiers create extra items with modifiers
for(var i=0; i<3; i++)
{
	var length = itemsTier[i].length;
	for(var ii=0;ii<length;ii++)
	{
		var item=itemsTier[i][ii];
		for(var iii=0;iii<modifiers.length;iii++)
		{
			var modifier = modifiers[iii];
			if(modifier.affect.indexOf(item.type) !=-1)
			{
				var newItem = new Item({
					name: modifier.name+" "+item.name,
					type: item.type,
					damage: item.damage+modifier.damage,
					armor: item.armor+modifier.armor
				});
				itemsTier[i].push(newItem);
			}
		}
	}
}
//For all tier 3s create an extra modified item
for(var ii=0;ii<length;ii++)
{
	var item=itemsTier[2][ii];
	for(var iii=0;iii<endModifiers.length;iii++)
	{
		var modifier = endModifiers[iii];
		if(modifier.affect.indexOf(item.type) !=-1)
		{
			var newItem = new Item({
				name: item.name+" of "+modifier.name,
				type: item.type,
				damage: item.damage+modifier.damage,
				armor: item.armor+modifier.armor
			});
			itemsTier[2].push(newItem);
		}
	}
}
//For all tier 2s create an extra modified item for in tier 3
for(var ii=0;ii<length;ii++)
{
	var item=itemsTier[1][ii];
	for(var iii=0;iii<endModifiers.length;iii++)
	{
		var modifier = endModifiers[iii];
		if(modifier.affect.indexOf(item.type) !=-1)
		{
			var newItem = new Item({
				name: item.name+" of "+modifier.name,
				type: item.type,
				damage: item.damage+modifier.damage,
				armor: item.armor+modifier.armor
			});
			itemsTier[2].push(newItem);
		}
	}
}
console.log(itemsTier[0].length);
console.log(itemsTier[1].length);
console.log(itemsTier[2].length);

router.get('/add-random/:tier', function(req, res){
	
	var tier = req.params.tier;
	req.user.trunk.push(itemsTier[tier][Math.floor(Math.random()*itemsTier[tier].length)]);
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


module.exports = router;
