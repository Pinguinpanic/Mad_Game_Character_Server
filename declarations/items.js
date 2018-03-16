var Item = require('../models/item');

console.log("Loading items...");

//Generate a set of items
var itemsTier = [[],[],[],[]];

//Weapon subtypes
var weaponsubtypes = ["unarmed","stab","slash","spear","hack","slash","club","doublekatana","excalibur","mjolnir","gungir","eagis"];

//Fill tier 1
itemsTier[0].push(new Item({	tier:0,		name: "Jagged Dagger",		type: "Weapon",		subtype: "stab",	damage: 2,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Iron Sword",		type: "Weapon",		subtype: "slash",	damage: 2,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Wooden Spear",		type: "Weapon",		subtype: "spear",	damage: 1,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Iron Axe",		type: "Weapon",		subtype: "hack",	damage: 3,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Pactice Sword",		type: "Weapon",		subtype: "slash",	damage: 1,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Iron Broadsword",	type: "Weapon",		subtype: "slash",	damage: 3,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Iron Halberd",		type: "Weapon",		subtype: "hack",	damage: 3,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Wooden Halberd",		type: "Weapon",		subtype: "stab",	damage: 2,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Iron Mace",		type: "Weapon",		subtype: "club",	damage: 3,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Wooden Club",		type: "Weapon",		subtype: "club",	damage: 2,	armor: 0 }));

itemsTier[0].push(new Item({	tier:0,		name: "Fur Vest",		type: "Armor",		damage: 0,	armor: 2 }));
itemsTier[0].push(new Item({	tier:0,		name: "Cloth Vest",		type: "Armor",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Fur Cloak",		type: "Armor",		damage: 0,	armor: 2 }));
itemsTier[0].push(new Item({	tier:0,		name: "Cloth Cloak",		type: "Armor",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Fur Armor",		type: "Armor",		damage: 0,	armor: 3 }));
itemsTier[0].push(new Item({	tier:0,		name: "Wooden Armor",		type: "Armor",		damage: -1,	armor: 2 }));
itemsTier[0].push(new Item({	tier:0,		name: "Spiked Fur Armor",	type: "Armor",		damage: 1,	armor: 3 }));
itemsTier[0].push(new Item({	tier:0,		name: "Bronze Chainmail",	type: "Armor",		damage: 0,	armor: 4 }));
itemsTier[0].push(new Item({	tier:0,		name: "Cloth Shirt",		type: "Armor",		damage: 0,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Cloth Robe",		type: "Armor",		damage: 0,	armor: 1 }));

itemsTier[0].push(new Item({	tier:0,		name: "Fur Cap",		type: "Helmet",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Fur Turban",		type: "Helmet",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Fur Hood",		type: "Helmet",		damage: 0,	armor: 1 }));
itemsTier[0].push(new Item({	tier:0,		name: "Cloth Hood",		type: "Helmet",		damage: 0,	armor: 0 }));
itemsTier[0].push(new Item({	tier:0,		name: "Wooden Mask",		type: "Helmet",		damage: 0,	armor: 1 }));

//Fill tier 2
itemsTier[1].push(new Item({	tier:1,		name: "Poisoned Dagger",	type: "Weapon",		subtype: "stab",	damage: 5,	armor: 0 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Sword",		type: "Weapon",		subtype: "slash",	damage: 4,	armor: 2 }));
itemsTier[1].push(new Item({	tier:1,		name: "Katana",			type: "Weapon",		subtype: "slash",	damage: 4,	armor: 3 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Battleaxe",	type: "Weapon",		subtype: "hack",	damage: 7,	armor: -1 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Rapier",		type: "Weapon",		subtype: "stab",	damage: 4,	armor: 1 }));
itemsTier[1].push(new Item({	tier:1,		name: "Lead Mace",		type: "Weapon",		subtype: "club",	damage: 6,	armor: -1 }));
itemsTier[1].push(new Item({	tier:1,		name: "Giant Shield",		type: "Weapon",		subtype: "club",	damage: 0,	armor: 5 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Pike",		type: "Weapon",		subtype: "spear",	damage: 5,	armor: 0 }));


itemsTier[1].push(new Item({	tier:1,		name: "Iron Chainmail",		type: "Armor",		damage: -1,	armor: 5 }));
itemsTier[1].push(new Item({	tier:1,		name: "Iron Platemail",		type: "Armor",		damage: -2,	armor: 8 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Chainmail",	type: "Armor",		damage: -1,	armor: 6 }));
itemsTier[1].push(new Item({	tier:1,		name: "Iron Platemail",		type: "Armor",		damage: -2,	armor: 9 }));
itemsTier[1].push(new Item({	tier:1,		name: "Spiked Leather Armor",	type: "Armor",		damage: 2,	armor: 4 }));
itemsTier[1].push(new Item({	tier:1,		name: "Leather Cloak",		type: "Armor",		damage: 0,	armor: 3 }));
itemsTier[1].push(new Item({	tier:1,		name: "Leather Armor",		type: "Armor",		damage: 0,	armor: 4 }));

itemsTier[1].push(new Item({	tier:1,		name: "Iron Helmet",		type: "Helmet",		damage: 0,	armor: 2 }));
itemsTier[1].push(new Item({	tier:1,		name: "Iron Full Helmet",	type: "Helmet",		damage: -1,	armor: 3 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Helmet",		type: "Helmet",		damage: 0,	armor: 3 }));
itemsTier[1].push(new Item({	tier:1,		name: "Steel Full Helmet",	type: "Helmet",		damage: 0,	armor: 3 }));
itemsTier[1].push(new Item({	tier:1,		name: "Leather Hood",		type: "Helmet",		damage: 0,	armor: 2 }));
itemsTier[1].push(new Item({	tier:1,		name: "Iron Mask",		type: "Helmet",		damage: 0,	armor: 2 }));

//Fill tier 3
itemsTier[2].push(new Item({	tier:2,		name: "Venomous Dagger",	type: "Weapon",		subtype: "stab",	damage: 5,	armor: 0 }));
itemsTier[2].push(new Item({	tier:2,		name: "Double Katana",		type: "Weapon",		subtype: "doublekatana",damage: 7,	armor: 4 }));
itemsTier[2].push(new Item({	tier:2,		name: "Berserker Battleaxe",	type: "Weapon",		subtype: "hack",	damage: 10,	armor: -2 }));
itemsTier[2].push(new Item({	tier:2,		name: "Balanced Rapier",	type: "Weapon",		subtype: "stab",	damage: 6,	armor: 3 }));

itemsTier[2].push(new Item({	tier:2,		name: "Goldplated Chainmail",	type: "Armor",		damage: -2,	armor: 10 }));
itemsTier[2].push(new Item({	tier:2,		name: "Siege Armor",		type: "Armor",		damage: -3,	armor: 12 }));
itemsTier[2].push(new Item({	tier:2,		name: "Poison Spiked Armor",	type: "Armor",		damage: 2,	armor: 6 }));
itemsTier[2].push(new Item({	tier:2,		name: "Dragonhide Cloak",	type: "Armor",		damage: 0,	armor: 8 }));

itemsTier[2].push(new Item({	tier:2,		name: "Dragonhide Hood",	type: "Helmet",		damage: 1,	armor: 4 }));
itemsTier[2].push(new Item({	tier:2,		name: "Goldplated Full Helm",	type: "Helmet",		damage: -1,	armor: 6 }));
itemsTier[2].push(new Item({	tier:2,		name: "Winged Helm",		type: "Helmet",		damage: 0,	armor: 5 }));

//Fill tier 4
itemsTier[3].push(new Item({	tier:3,		name: "Excalibur",		type: "Weapon",		subtype: "excalibur",	damage: 15,	armor: 5 }));
itemsTier[3].push(new Item({	tier:3,		name: "Mjölnir",		type: "Weapon",		subtype: "mjolnir",	damage: 20,	armor: -10 }));
itemsTier[3].push(new Item({	tier:3,		name: "Gungir",			type: "Weapon",		subtype: "gungir",	damage: 15,	armor: 0 }));
itemsTier[3].push(new Item({	tier:3,		name: "Aegis",			type: "Weapon",		subtype: "aegis",	damage: 0,	armor: 20 }));

itemsTier[3].push(new Item({	tier:3,		name: "Dwemmer Platemail",		type: "Armor",		damage: -10,	armor: 20 }));
itemsTier[3].push(new Item({	tier:3,		name: "Medusa Skin Chainmail",		type: "Armor",		damage: 5,	armor: 10 }));
itemsTier[3].push(new Item({	tier:3,		name: "Leviathan Hide Cloak",		type: "Armor",		damage: 0,	armor: 15 }));

itemsTier[3].push(new Item({	tier:3,		name: "Medusa's Mask",		type: "Helmet",		damage: 10,	armor: 5 }));
itemsTier[3].push(new Item({	tier:3,		name: "Dwemmer Full Helm",	type: "Helmet",		damage: -4,	armor: 12 }));
itemsTier[3].push(new Item({	tier:3,		name: "Leaviathan Hide Hood",	type: "Helmet",		damage: 0,	armor: 8 }));

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


var tier3modifiers = [];
tier3modifiers.push({name:"Demon", 	damage:10, 	armor:-10,	affect:["Weapon","Armor","Helmet"]});
tier3modifiers.push({name:"Pulsing", 	damage:4, 	armor:0,	affect:["Weapon","Armor","Helmet"]});
tier3modifiers.push({name:"Lightning", 	damage:5, 	armor:0,	affect:["Weapon","Armor","Helmet"]});
tier3modifiers.push({name:"Enchanted",	damage:0, 	armor:5,	affect:["Weapon","Armor","Helmet"]});


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
					tier: item.tier,
					name: modifier.name+" "+item.name,
					type: item.type,
					subtype: item.subtype,
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
				tier: item.tier,
				name: item.name+" of "+modifier.name,
				type: item.type,
				subtype: item.subtype,
				damage: item.damage+modifier.damage,
				armor: item.armor+modifier.armor
			});
			itemsTier[2].push(newItem);
		}
	}
}

//For all tier 4s create an extra modified item (endModifier)
for(var ii=0;ii<length;ii++)
{
	var item=itemsTier[3][ii];
	for(var iii=0;iii<endModifiers.length;iii++)
	{
		var modifier = endModifiers[iii];
		if(modifier.affect.indexOf(item.type) !=-1)
		{
			var newItem = new Item({
				tier: item.tier,
				name: item.name+" of "+modifier.name,
				type: item.type,
				subtype: item.subtype,
				damage: item.damage+modifier.damage,
				armor: item.armor+modifier.armor
			});
			itemsTier[3].push(newItem);
		}
	}
}
//Special front modifiers for Tier4
var length = itemsTier[3].length;
for(var ii=0;ii<length;ii++)
{
	var item=itemsTier[3][ii];
	for(var iii=0;iii<tier3modifiers.length;iii++)
	{
		var modifier = tier3modifiers[iii];
		if(modifier.affect.indexOf(item.type) !=-1)
		{
			var newItem = new Item({
				tier: item.tier,
				name: modifier.name+" "+item.name,
				type: item.type,
				subtype: item.subtype,
				damage: item.damage+modifier.damage,
				armor: item.armor+modifier.armor
			});
			itemsTier[3].push(newItem);
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
				tier: 2,
				name: item.name+" of "+modifier.name,
				type: item.type,
				subtype: item.subtype,
				damage: item.damage+modifier.damage,
				armor: item.armor+modifier.armor
			});
			itemsTier[2].push(newItem);
		}
	}
}

var total=0;
for(var i = 0; i<itemsTier.length ; i++)
{
	console.log("Loaded "+itemsTier[i].length +" items for tier "+i+".");
	total+=itemsTier[i].length;
}

console.log("Total of "+total+" loaded.");

var lootChests =[
	["Smelly bag","Wooden chest","Sack","Wooden barrel","Plastic teut"],
	["Decent chest","Chest","Iron Barrel","Box","Knapsack","Sachel","Case","Copper Chest"],
	["Silver Chest","Decorated Chest","Nice Bag","Mithril Chest","Embroided Bag","Special Chest"],
	["Magical lamp","Golden chest","Pandora's Box","Dark Chest","Diamond Chest","Very Nice Bag"]
];
//Give everything a loot Chest
for(var i=0;i<4;i++)
{
	for(var ii=0;ii<itemsTier[i].length;ii++)
	{
		itemsTier[i][ii].fresh = true;
		itemsTier[i][ii].chest = lootChests[i][i%lootChests[i].length];
	}
}


//Individual Loot Chance
function ilc(tier, lvl)
{
	switch(tier)
	{
		case 0:
		return Math.max(0,100-3*lvl);
		case 1:
		return Math.max(0,0.0104819*lvl*lvl*lvl-0.678667*lvl*lvl+11.9949*lvl-0.765172);
		case 2:
		return Math.max(0,0.00126743*lvl*lvl*lvl-0.124757*lvl*lvl+3.85381*lvl-17.7995);
		case 3:
		return Math.max(0,-0.0015481*lvl*lvl*lvl+0.0465047*lvl*lvl+0.965397*lvl-13.2352);
	}
}
//LOOT CURVES
function lootChance(tier,lvl)
{
	//Chance sum
	var sum=ilc(0,lvl)+ilc(1,lvl)+ilc(2,lvl)+ilc(3,lvl);
	return ilc(tier,lvl)/sum;
}

function getLoot(tier)
{
	var tierItems = itemsTier[tier];
	return tierItems[Math.floor(Math.random()*tierItems.length)];
}

module.exports = { 
	all: function()
	{
		return itemsTier;
	},
	tier: function(t)
	{
		return itemsTier[t];
	},
	getLoot: function(tier)
	{
		return getLoot(tier);
	},
	getLeveledLoot: function(level)
	{
		var cum=0;
		var chance = Math.random();
		cum+=lootChance(0,level);
		if(chance<=cum)
		{
			return getLoot(0);
		}
		cum+=lootChance(1,level);
		if(chance<=cum)
		{
			return getLoot(1);
		}
		cum+=lootChance(2,level);
		if(chance<=cum)
		{
			return getLoot(2);
		}
		else
		{
			return getLoot(3);
		}
	}
}

