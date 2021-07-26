const { hashSync, compareSync } = require("bcryptjs");
console.log(hashSync("Admin123", 10));
