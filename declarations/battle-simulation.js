var Level = require('../declarations/level.js');
//Weapon subtypes
//var weaponsubtypes = ["unarmed","stab","slash","spear","hack","slash","club","doublekatana","excalibur","mjolnir","gungir","eagis"];

var killXP = 50;
var winnerXP = 50;

var weaponAnimations = {
	"unarmed" :
	{
		attack: [" punches "," kicks "," elbows "],
		parry: [" dodges "," evades "]
	},
	"stab" :
	{
		attack: [" stabs "," takes a jab at "," makes a quick stab at "],
		parry: [" dodges ", " evades "]
	},
	"spear" :
	{
		attack: [" stabs "," thrusts "," hits "],
		parry: [" blocks ", " deflects "," dodges ", " evades "]
	},
	"hack" :
	{
		attack: [" hacks "," slashes "," hits "],
		parry: [" blocks ", " deflects "," dodges ", " evades "]
	},
	"slash" :
	{
		attack: [" stabs "," slashes "," hits "],
		parry: [" parries ", " blocks ", " deflects "," dodges ", " evades "]
	},
	"club" :
	{
		attack: [" clubs "," boops "," hits "],
		parry: [" blocks ", " dodges ", " evades "]
	},
	"doublekatana" :
	{
		attack: [" slashes "," samurais the shit out of "],
		parry: [" blocks ", " uses his ninja reflexes to block ", " evades ", " dodges "]
	},
	"excalibur" :
	{
		attack: [" stabs "," slashes "," hits ", " gracefully slashes ", " thoughtfully stabs "],
		parry: [" blocks ", " swiftly parries ", " parries ", " steps out of the way of "]
	},
	"mjolnir" :
	{
		attack: [" hacks "," slashes "," hits ", " shoots lightning at "],
		parry: [" blocks ", " deflects "," dodges ", " evades "]
	},
	"gungir" :
	{
		attack: [" stabs "," thrusts "," hits ", " , with Odin's strength, thrusts "],
		parry: [" blocks ", " deflects "," dodges ", " evades "]
	},
	"aegis" :
	{
		attack: [" clubs "," boops "," hits ", " slams the ground creating a shockwave that hits "],
		parry: [" blocks ", " dodges ", " evades "]
	},
}

function addLine(battle, line)
{
	battle.battleLog.push(line);
}

function choose(array)
{
	return array[Math.floor(Math.random()*array.length)];
}

function addXp(battle, actor, xp)
{
	actor.user.xp+=xp;
	while(actor.user.xp>= Level.getXpForLvl(actor.user.level+1))
	{
		actor.user.level++;
		actor.user.nextxp = Level.getXpForLvl(actor.user.level+1)
		addLine(battle,actor.printname + ' leveled up.');
		console.log('Level up for '+actor.user.username);
	}	
}

function die(battle,actor)
{
	if(Math.random()*-50>Math.random()*actor.hp || Math.random()>0.9)
	{
		actor.user.weapon=[];
		actor.user.armor=[];
		actor.user.helmet=[];
		actor.user.totalarmor=0;
		actor.user.totaldamage=0;
		actor.user.level=0;
		actor.user.xp=0;
		if(actor.hp<-20)
		{
			addLine(battle,actor.printname+choose([" was absolutely pulverized."," was turned into a bloody pulp."," has been brutally massacred."]));
		}
		else if(actor.hp<-10)
		{
			addLine(battle,actor.printname+choose([" was torn in half.", " has hacked into mutliple parts."," is very dead."]));
		}
		else
		{
			addLine(battle,actor.printname+choose([" has died."," dies.","has been deaded."," is dead.","has joined the afterlife"]));
		}
	}
	else
	{
		addLine(battle,actor.printname+choose([" was knocked unconscious."," falls on the floor in pain."," goes down."," succumbs to his wounds."," hits the floor unconsious"," goes out."]));
	}
}
function attack(battle,actor,target)
{
	console.log("Weapontype:"+target.weapontype);
	if(2*Math.random()*actor.dmg<(Math.random()*target.hp*1.5+Math.random()*target.dmg*0.5))
	{
		addLine(battle,actor.printname+choose(weaponAnimations[actor.weapontype].attack)+target.printname+" with his "+actor.weapon
			+" but he "+choose(weaponAnimations[actor.weapontype].parry)+".");
		if(Math.random()>0.7)
		{
			addLine(battle,target.printname+choose([" makes a counter-attack."," makes a quick counter-move."," counters."]));
			attack(battle,target,actor);	
		}
	}
	else
	{
		if(Math.random()>0.1)
		{
			target.hp-=Math.round(Math.random()*actor.dmg);
			addLine(battle,actor.printname+choose(weaponAnimations[actor.weapontype].attack)+target.printname+" with his "+actor.weapon+".");
		}
	}
}
function shuffle(array) {
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

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

function rc()
{
	return "#"+((1<<24)*Math.random()|0).toString(16)
}


function fightBattle(battle,battleDudes)
{
	if(battle.userCount <=1)
	{
		addLine(battle, "Nothing happens");
		return {battle: battle, battleDudes: battleDudes, winner : undefined};
	}
	else
	{		
		//All join the fight
		//console.log("Joining all");
		var battleActors = [];
		for( i in battleDudes )
		{
			var dude = battleDudes[i];

			var newActor = {printname: "<span style=\"color:"+rc()+";\">"+dude.username+"</span>", user: dude, hp: dude.totalarmor+20+dude.level/2, dmg: dude.totaldamage+20+dude.level/2};
			addLine(battle,newActor.printname + " joins the fights.");
			if(dude.weapon.length>0)
			{
				newActor.weapon = dude.weapon[0].name;
				newActor.weapontype = dude.weapon[0].subtype;
			}
			else
			{
				newActor.weapon = "bare hands";
				newActor.weapontype = "unarmed";
			}
			battleActors.push(newActor);
		}
		while(battleActors.length>1)
		{
			//console.log("Taking battle step");
			battleActors = shuffle(battleActors);
			console.log("Current length"+battleActors.length);
			console.log("First"+battleActors[0].user.username);
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
					attack(battle,actor,target);
					if(target.hp<=0)
					{
						die(battle,target);
						remove.push(target);
						addXp(battle,actor, killXP);
						
					}
					if(actor.hp<=0)
					{
						die(battle,actor);
						remove.push(actor);
						addXp(battle,target, killXP);
					}
				}
			}
			if(remove.length>0)
			{
				remove=uniq(remove);
				console.log("Removing: "+remove.length);
				for(i in remove)
				{
					//console.log("Removing user");
					battleActors.splice(battleActors.indexOf(remove[i]),1);
				}
			}
		}
		
		if(battleActors.length > 0)
		{
			console.log("Winner = "+battleActors[0].printname);
			addXp(battle, actor, winnerXP);
			addLine(battle,battleActors[0].printname+" wins.");
			return {battle: battle, battleDudes: battleDudes, winner : battleActors[0].user};
		}
		else
		{
			console.log("Battleactors are:"+JSON.stringify(battleActors));
			return {battle: battle, battleDudes: battleDudes, winner : undefined};
		}
	}
}

module.exports = { 
play: function(battle,battleDudes)
	{
		return fightBattle(battle,battleDudes);
	}
}

		
