var Quest = require('../models/quest');
var Items = require("../declarations/items.js");
var Accounts = require('../declarations/accounts.js');

console.log("Loading quests...");

var lowQuestNames= [];
var highQuestNames= [];
//Generate lots of quest names
var part1= ["Retrieve the","Slay the","Beat the","Rescue the","Find the","Collect the","Kill the","Pray for the ","Work for the"];
var part2= ["princess","mimic","prince","king","duke","queen","duchess","genie","demon","priest","ghost","goblin","bear","knight","lady","crocodile","horse","camel","funny looking guy"];
var adjectiveLow = ["lame","boring","weak","virgin","nice","smelly","good","friendly","smiling"];
var adjectiveHigh = ["evil","demonic","powerfull","golden","druidic","flying","ghastly","horrible","shining"];

for(var i=0; i<part1.length; i++)
{
	for(var ii=0; ii<part2.length; ii++)
	{
		lowQuestNames.push(part1[i]+" "+part2[ii]+".");
		for(var iii=0;iii<adjectiveLow.length;iii++)
		{
			lowQuestNames.push(part1[i]+" "+adjectiveLow[iii]+" "+part2[ii]+".");
		}
		for(var iii=0;iii<adjectiveLow.length;iii++)
		{
			highQuestNames.push(part1[i]+" "+adjectiveHigh[iii]+" "+part2[ii]+".");
		}
	}
}
console.log("Loaded "+lowQuestNames.length +" low quests.");
console.log("Loaded "+highQuestNames.length +" high quests.");

function generateQuest(lvl)
{
	lvl = getRandomizedLevel(lvl);
	var tier = Items.getScaledTier(lvl);
	console.log(lvl+","+tier);
	if(tier<2)
	{
		var name=getLowQuestName();
		var xp = 5+Math.round(15*Math.random());
		var danger = Math.round(Math.random()*10);
		var difficulty = Math.round(50*Math.random());
		var time = 3+Math.round(Math.random()*15);
	}
	else
	{
		var name=getHighQuestName();
		var xp = 10+Math.round(40*Math.random());
		var danger = Math.round(Math.random()*25);
		var difficulty = Math.round(100*Math.random());
		var time = 5+Math.round(Math.random()*25);
	}
	return new Quest({name: name, tier: tier, xp: xp, danger: danger, difficulty: difficulty, time: time});
}

function preformQuest(account, quest)
{
	//Catastrophic failure
	if(Math.random()*100<quest.danger)
	{
		Accounts.die(account);
		return "You died on your quest to "+quest.name;
	}
	//Went okay
	if(Math.random()*100>quest.difficulty)
	{
		Accounts.addXp(account, quest.xp);
		var newItem = Items.getLoot(quest.tier)
		account.trunk.push(newItem);
		return "You succeeded on your quest to "+quest.name+ " You earned " +quest.xp+" xp and received a " +newItem.chest+"!";
	}
	//Failed, still get a little xp
	var xp= 1+Math.floor(quest.xp*Math.random());
	Accounts.addXp(account,xp);
	return "You did not manage to "+quest.name+" You still earned " +xp+" xp.";
}

function getRandomizedLevel(lvl)
{
	if(Math.random()>0.8)
	{
		return lvl+Math.round(Math.random()*5);
	}
	return Math.max(0,Math.round(lvl-Math.random()*5));
}
function getLowQuestName()
{
	return choose(lowQuestNames);
}
function getHighQuestName()
{
	return choose(highQuestNames);
}

function choose(array)
{
	return array[Math.floor(Math.random()*array.length)];
}

module.exports = { 
	all: function()
	{
		return lowQuestNames;
	},
	generateQuest: function(lvl)
	{
		return generateQuest(lvl);
	},
	generateQuestSet: function(lvl,number)
	{
		quests=[];
		for(i=0; i<number; i++)
		{
			quests.push(generateQuest(lvl));
		}
		return quests;
	},
	doQuest: function(account, quest)
	{
		return preformQuest(account, quest);
	}
}

