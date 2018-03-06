var points = 0;

var levelArray = [];
var minlevel = 2; // first level to display
var maxlevel = 200; // last level to display

levelArray.push(0);

for (lvl = 1; lvl <= maxlevel; lvl++)
{
  points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7.));
  if (lvl >= minlevel) 
  {
	levelArray.push(output);
  }
  output = Math.floor(points / 4);
}

module.exports = { 
	giveXpArray: function()
	{
		return levelArray;
	},
	getXpForLvl: function(lvl)
	{
		return levelArray[lvl];
	},
	getLvlForXp: function(xp)
	{
		for(i = 0; i<=levelArray.length; i++) 
		{
			if(xp>=levelArray[i])
			{
				return i;
			}
		}
	},
}

