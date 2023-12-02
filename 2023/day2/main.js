const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

const games = data
		.map((s) => s.replace(/\s/g, '')
		.substring(s.indexOf(':'))
		.split(';')
		.map((ss) => ss.split(',')));

function partOne(games) {
	const limit = {
		'red': 12,
		'green': 13,
		'blue': 14
	}

	let sum = 0;
	games.forEach((game, gameIdx) => {
		const pass = game.every(round => round.every(handful => {
				const num = handful.replace(/\D/g, '');
				const color = handful.replace(/\d+/g, '');
				return num <= limit[color];
			}));
		if (pass) {
			sum += gameIdx + 1;
		}
	});
	return sum;
}

console.log(`Part 1 Sum: ${partOne(games)}`);

function partTwo(games) {
	let sum = 0;
	games.forEach(game => {
		let maxes = {
			'red': 0,
			'green': 0,
			'blue': 0,
		}
		game.forEach(round => {
			round.forEach(handful => {
				const num = parseInt(handful.replace(/\D/g, ''));
				const color = handful.replace(/\d+/g, '');
				if (num > maxes[color]) {
					maxes[color] = num;
				}
			});
		});
		sum += Object.values(maxes).reduce((a,b) => (a*b));
	});
	return sum;
}

console.log(`Part 2 Sum: ${partTwo(games)}`);