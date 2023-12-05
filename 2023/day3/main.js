const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

let nums = [];
let map = {};

data.forEach((dStr, i) => {
	let start = -1;
	let keys = [];
	for (let j = 0; j < dStr.length; j++) {
		if (!isNaN(dStr.charAt(j))) {
			if (start === -1) {
				start = j;
			}
			keys.push(i + '' +  j);
		} else {
			if (start !== -1) {
				nums.push(parseInt(dStr.substring(start, j)));
				const val = nums.length - 1;
				keys.forEach(k => {
					map[k] = val;
				});
				start = -1;
			}
			keys = [];
		}
	}
});

let sum = 0;
data.forEach((dStr, i) => {
	for (let j = 0; j < dStr.length; j++) {
		if (isNaN(dStr.charAt(j)) && dStr.charAt(j) !== '.') {
			let left = [i-1, i, i+1];
			let right = [j-1, j, j+1];
			let idx = -1;
			left.forEach(l => {
				right.forEach(r => {
					if (!isNaN(data[l].charAt(r))) {
						idx = map[l + '' + r];
						sum += nums[idx];
						console.log(sum);
						nums[idx] = 0;
					}
				});
			});
		}
	}
});

console.log(sum);