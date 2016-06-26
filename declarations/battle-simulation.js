
//Weapon subtypes
//var weaponsubtypes = ["unarmed","stab","slash","spear","hack","slash","club","doublekatana","excalibur","mjolnir","gungir","eagis"];

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


function die(battle,actor)
{
	if(Math.random()*-50>Math.random()*actor.hp)
	{
		actor.user.weapon=[];
		actor.user.armor=[];
		actor.user.helmet=[];
		actor.user.totalarmor=0;
		actor.user.totaldamage=0;
		actor.user.level=0;
		if(actor.hp<-20)
		{
			addLine(battle,actor.user.username+choose([" was absolutely pulverized."," was turned into a bloody pulp."," has been brutally massacred."]));
		}
		else if(actor.hp<-10)
		{
			addLine(battle,actor.user.username+choose([" was torn in half.", " has hacked into mutliple parts."," is very dead."]));
		}
		else
		{
			addLine(battle,actor.user.username+choose([" has died."," dies.","has been deaded."," is dead.","has joined the afterlife"]));
		}
	}
	else
	{
		addLine(battle,actor.user.username+choose([" was knocked unconscious."," falls on the floor in pain."," goes down."," succumbs to his wounds."," hits the floor unconsious"," goes out."]));
	}
}
function attack(battle,actor,target)
{
	console.log("Weapontype:"+target.weapontype);
	if(2*Math.random()*actor.user.totaldamage<(Math.random()*target.user.totalarmor+Math.random()*target.user.totaldamage*.5))
	{
		addLine(battle,actor.user.username+choose(weaponAnimations[actor.weapontype].attack)+target.user.username+" with his "+actor.weapon
			+" but he "+choose(weaponAnimations[actor.weapontype].parry)+".");
		if(Math.random()>0.8)
		{
			addLine(battle,target.user.username+choose([" makes a counter-attack."," makes a quick counter-move."," counters."]));
			attack(battle,actor,target);	
		}
	}
	else
	{
		if(Math.random()>0.1)
		{
			target.hp-=Math.round(Math.random()*actor.dmg);
			addLine(battle,actor.user.username+choose(weaponAnimations[actor.weapontype].attack)+target.user.username+" with his "+actor.weapon+".");
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
			addLine(battle,dude.username + " joins the fights.");
			var newActor = {user: dude, hp: dude.totalarmor+20+dude.level/2, dmg: dude.totaldamage+20+dude.level/2};
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
					}
					if(actor.hp<=0)
					{
						die(battle,actor);
						remove.push(actor);
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
			addLine(battle,battleActors[0].user.username+" wins.");
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

		
