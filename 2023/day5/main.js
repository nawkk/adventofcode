const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

const data = parse(fs.readFileSync("example.txt", "utf-8"));
// const data = parse(fs.readFileSync("input.txt", "utf-8"));

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



function partTwo(data) {
	const seeds = organizeSeedRanges(data);
	const sections = initSections(data);
	let removalInd = false;
	let locMaps = data.slice(Number(sections.slice(-1)) + 1, data.length).map(x => x.split(' ').map( Number ));
	locMaps.sort((a,b) => a[0] - b[0]);
	locMaps.forEach(map => {
		const [dest, src, range] = map;
	});

	// humStart, humEnd
	let seedRange = findSeedRange(seeds, data, sections, 1, 69);
	// remove seed range
	console.log(seedRange);
	console.log(seeds);

	// write findSeedRange(locStart, locEnd)
	// loop through locations array (locStart, locEnd)

	return 'done';
}

function findSeedRange(seeds, data, sections, humStart, humEnd) {
	// console.log(`seeds: ${seeds}, sections: ${sections}`);
	// start at section 6
	let start = humStart;
	let end = humEnd;
	for (let i = 5; i >= 0; i--) {
		for (let j = sections[i]+1; j < sections[i+1]; j++) {
				const [dest, src, range] = data[j].split(' ').map(Number);
				console.log(`d: ${dest}, s: ${src}, r: ${range}`);
				if (start >= dest && start <= dest + range - 1) {
					let destDiff = start - dest;
					let srcDiff = end - (dest + range - 1);
					start = src + destDiff;
					end = src + range - 1 + srcDiff;
					console.log(`destDiff: ${destDiff}, srcDiff: ${srcDiff}`);
				}
		}
	}

	return [start, end];
}

function organizeSeedRanges(data) {
	return data.shift().split(': ')[1].split(' ').reduce((accumulator, currentValue, currentIndex, array) => {
		if (currentIndex % 2 === 0) {
			const [seed, range] = array.slice(currentIndex, currentIndex + 2).map( Number );
			accumulator.push([ seed, seed + range - 1 ]);
		}
		return accumulator;
	}, [])
}

function initSections(data) {
	return data.reduce((acc, curr, idx) => {
		if (isNaN(curr.charAt(0))) acc.push(idx);
		return acc;
	}, []);
}

// console.log(partOne(data));
console.log(partTwo(data));