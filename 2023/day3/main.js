const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

// const data = parse(fs.readFileSync("example.txt", "utf-8"));
const data = parse(fs.readFileSync("input.txt", "utf-8"));

function partOne(data) {
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
				keys.push(i + ',' +  j);
			}
			if (isNaN(dStr.charAt(j)) || j === dStr.length-1) {
				if (start !== -1) {
					let num = (j === dStr.length-1) 
						? parseInt(dStr.substring(start, j+1))
						: parseInt(dStr.substring(start, j));
					nums.push(num);
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
							idx = map[l + ',' + r];
							sum += nums[idx];
							nums[idx] = 0;
						}
					});
				});
			}
		}
	});

	console.log(sum);
}

function partTwo(data) {
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
				keys.push(i + ',' +  j);
			}
			if (isNaN(dStr.charAt(j)) || j === dStr.length-1) {
				if (start !== -1) {
					let num = (j === dStr.length-1) 
						? parseInt(dStr.substring(start, j+1))
						: parseInt(dStr.substring(start, j));
					nums.push(num);
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
			if (dStr.charAt(j) === '*') {
				let left = [i-1, i, i+1];
				let right = [j-1, j, j+1];
				let idx = -1;
				let idxCache = new Set();
				left.forEach(l => {
					right.forEach(r => {
						if (!isNaN(data[l].charAt(r))) {
							idx = map[l + ',' + r];
							idxCache.add(idx);
						}
					});
				});
				if (idxCache.size === 2) {
					let gearRatio = 1;
					idxCache.forEach(v => {
						gearRatio = gearRatio * nums[v];
						nums[v] = 0;
					});
					sum += gearRatio;
				}
			}
		}
	});

	console.log(sum);

}

// partOne(data);
partTwo(data);