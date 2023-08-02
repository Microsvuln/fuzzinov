import { fuzzFile } from './mutator';
// Path to the TypeScript file to fuzz
const filePath = './file.ts';
// Apply fuzzing
fuzzFile(filePath);
// Additional logic can be placed here.
// For example, you can log a message to indicate that the fuzzing has been completed.
console.log('Fuzzing has been applied to the file:', filePath);
// If you have any other functions or logic you want to include, you can place them below.
