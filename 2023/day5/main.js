const fs = require("fs");

const parse = (source) => source.split(/\r?\n/).filter(Boolean);

const data = parse(fs.readFileSync("example.txt", "utf-8"));
// const data = parse(fs.readFileSync("input.txt", "utf-8"));

console.log(data);



// Need to return LOWEST location number that 
	// corresponds to any of the initial seed numbers 