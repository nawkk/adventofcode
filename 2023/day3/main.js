const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

const data = parse(fs.readFileSync("example.txt", "utf-8"));
// const data = parse(fs.readFileSync("input.txt", "utf-8"));

console.log(data);

// example has 1-10
// input has 1-140


data.forEach((d, dIdx) => {
	for (let i = 0; i < d.length; i++) {
		if (isNaN(d.charAt(i)) && d.charAt(i) !== '.') {
			// symbol found
			// check hitbox
			let prevD = dIdx - 1;
			let nextD = dIdx + 1;
			console.log(data[prevD].charAt(i-1));
			console.log(data[prevD].charAt(i));
			console.log(data[prevD].charAt(i+1));

			console.log(data[dIdx].charAt(i-1));
			console.log(data[dIdx].charAt(i));
			console.log(data[dIdx].charAt(i+1));

			console.log(data[nextD].charAt(i-1));
			console.log(data[nextD].charAt(i));
			console.log(data[nextD].charAt(i+1));
		}
	}
});
