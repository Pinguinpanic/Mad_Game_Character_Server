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
	if(1.2*Math.random()*actor.user.totaldamage<(Math.random()*target.user.totalarmor+Math.random()*target.user.totaldamage))
	{
		addLine(battle,actor.user.username+choose([" tries to slash "," takes a jab at "," swings his "+actor.weapon+" at ", " flings his "+actor.weapon+" at "])+target.user.username+choose([", but he parries.",", but he blocks with his " +target.weapon+"."," but the hit is parried by his "+target.weapon+"."," but he deflects it.", " but he dodges."]));
		if(Math.random()>0.8)
		{
			addLine(battle,target.user.username+choose([" makes a counter-attack."," makes a quick counter-move."," counters."]));
			attack(battle,actor,target);	
		}
	}
	else
	{
		if(Math.random()>0.3)
		{
			target.hp-=Math.round(Math.random()*actor.dmg);
			addLine(battle,actor.user.username+choose([" slashes "," takes a jab at"," connects a swing to "," deals a blow with his "+actor.weapon+" to", " flings his "+actor.weapon+" at "])+target.user.username+".");
		}
		else
		{
			addLine(battle,actor.user.username+choose([" misses "," barely misses "])+target.user.username+".");
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



function fightBattle(battle,battleDudes)
{
	if(battle.userCount <=1)
	{
		addLine(battle, "Nothing happens");
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
			var newActor = {user: dude, hp: dude.totalarmor+20, dmg: dude.totaldamage+20};
			if(dude.weapon.length>0)
			{
				newActor.weapon = dude.weapon[0].name;
			}
			else
			{
				newActor.weapon = "bare hands";
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
					attack(battle,actor,target);
					if(target.hp<=0)
					{
						die(battle,target);
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
		addLine(battle,"Battle ends.")
	}
	return {battle: battle, battleDudes: battleDudes};
}

module.exports = { 
play: function(battle,battleDudes)
	{
		return fightBattle(battle,battleDudes);
	}
}

		
