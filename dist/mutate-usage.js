"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutator_1 = require("./mutator");
// Path to the TypeScript file to fuzz
const filePath = './file.ts';
// Apply fuzzing
(0, mutator_1.fuzzFile)(filePath);
// Additional logic can be placed here.
// For example, you can log a message to indicate that the fuzzing has been completed.
console.log('Fuzzing has been applied to the file:', filePath);
// If you have any other functions or logic you want to include, you can place them below.
