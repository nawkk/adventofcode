const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

function partOne(data) {
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
		const pass = game.every(round => {
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
	return sum;
}

console.log(`Part 1 Sum: ${partOne(data)}`);