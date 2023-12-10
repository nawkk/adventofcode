const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

// [dest, src, range]

// Performance could be improved... greatly
function partOne(data) {
	const seeds = data.shift().split(': ')[1].split(' ');

	let low = -1;
	seeds.forEach(seed => {
		let temp = seed;
		let section = 0;
		let goNext = false;
		data.forEach((x) => {
			if (isNaN(x.charAt(0))) {
				section++;
				goNext = false;
			} else if (goNext) {
				return;
			} else {
				const [dest, src, range] = x.split(' ').map(Number);
				if (temp >= src && temp <= src + range - 1) {
					temp = temp - src + dest;
					goNext = true;
				}
			}
		});
		if (section === 7) {
			low = (low === -1 || temp < low) ? temp : low;
		}

	})

	return low;
}
console.log(partOne(data));