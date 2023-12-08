const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

function partOne(data) {
	return data.map(d => d.match(/\d/g))
						.map(d => (d && d.length > 0) ? Number(d[0] + d[d.length-1]) : 0)
						.reduce((a,b) => a+b);
}

function partTwo(data) {
	const num = {
		'one': 1,
		'two': 2,
		'three': 3,
		'four': 4,
		'five': 5,
		'six': 6,
		'seven': 7,
		'eight': 8,
		'nine': 9
	};

	const regex = /((?=(one|two|three|four|five|six|seven|eight|nine))|\d)/g;
	const matches = data.map(d => [...d.matchAll(regex)].map(([n, nr, ns]) => Number(num?.[ns] ?? n)));
	const sum = matches.map((m) => (m && m.length > 0) ? m[0] * 10 + m[m.length - 1] : 0)
										.reduce((a,b) => a + b);

	return sum;
}

// console.log(partOne(data));
console.log(partTwo(data));