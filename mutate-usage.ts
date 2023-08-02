import { fuzzFile } from './mutator';

// Path to the TypeScript file to fuzz
const filePath = './file.ts';

// Apply fuzzing
fuzzFile(filePath);