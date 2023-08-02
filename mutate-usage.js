"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mutator_1 = require("./mutator");
// Path to the TypeScript file to fuzz
var filePath = './file.ts';
// Apply fuzzing
(0, mutator_1.fuzzFile)(filePath);
