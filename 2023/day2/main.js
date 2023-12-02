const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

const games = data.map((s) => {
	return s.replace(/\s/g, '')
					.substring(s.indexOf(':'))
					.split(';')
					.map((ss) => {
						return ss.split(',');
					});
});

const limit = {
	'red': 12,
	'green': 13,
	'blue': 14
}

let sum = 0;
games.forEach((game, gameIdx) => {
	let pass = game.every(round => {
		return round.every(handful => {
			const num = handful.replace(/\D/g, '');
			const color = handful.replace(/\d+/g, '');
			return num <= limit[color];
		});
	});
	if (pass) {
		sum += gameIdx + 1;
	}
});
console.log(`Sum: ${sum}`);

// grab file
// convert file data into map

// loop through games
	// single game
	// loop through game
		// single round
		// check each color to see if they are over the limit
			// over limit
				// go to next round
		// if we finished checking each color, that means they are all under the limit
		// add game id to the final sum
// return sum