var Level = require('../declarations/level.js');

function die(account) {
	account.weapon=[];
	account.armor=[];
	account.helmet=[];
	account.totalarmor=0;
	account.totaldamage=0;
	account.level=0;
	account.xp=0;
	account.nextxp=Level.getXpForLvl(1);
	currentquest=[];
	account.quests=[];
	account.fresh = true;
	account.participating = false;
}

function addXp(account, xp)
{
	var lvlUps = 0; 
	account.xp+=xp;
	while(account.xp>= Level.getXpForLvl(account.level+1))
	{
		account.level++;
		account.nextxp = Level.getXpForLvl(account.level+1)
		lvlUps++;
	}	
	return lvlUps;
}

module.exports = { 
	die: function(account)
	{
		die(account);
	},
	addXp: function(account, xp)
	{
		return addXp(account, xp);
	}
}

