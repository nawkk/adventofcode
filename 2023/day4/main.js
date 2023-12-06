const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

// did not account for duplicates 
function partOne(data) {
	let sum = 0;
	data.forEach(d => {
		const nums = d.split(':')[1];
		const [ winning, mine ] = nums.split('|');
		const winningArr = winning.split(' ');
		const mineArr = mine.split(' ');
		let map = {};
		let points = 0;

		winningArr.forEach(wn => {
			if (wn !== '') {
				map[wn] = 0;
			}
		});
		mineArr.forEach(v => {
			if (v !== '') {
				let val = map[v];
				if (val !== undefined && val === 0) {
					map[v]++;
					points = (points === 0) ? 1 : points * 2;
				}
			}
		});
		sum += points;
	});
	return sum;
}

function partTwo(data) {
	let sum = 0;
	let countArr = [];
	data.forEach((d, i) => {
		const nums = d.split(':')[1];
		const [ winning, mine ] = nums.split('|');
		const winningArr = winning.split(' ');
		const mineArr = mine.split(' ');
		let map = {};
		let matches = 0;

		winningArr.forEach(wn => {
			if (wn !== '') {
				map[wn] = 0;
			}
		});
		mineArr.forEach(v => {
			if (v !== '') {
				let val = map[v];
				if (val !== undefined && val === 0) {
					map[v]++;
					matches++;
				}
			}
		});
		if (countArr[i] === undefined) {
			countArr[i] = 0;
		}
		countArr[i]++;
		while (matches > 0) {
			if (countArr[i+matches] === undefined) {
				countArr[i+matches] = 0;
			}
			countArr[i+matches] += countArr[i];
			matches--;
		}
		sum += countArr[i];
	});
	return sum;
}

// console.log(partOne(data));
console.log(partTwo(data));