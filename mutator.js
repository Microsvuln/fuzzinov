"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzFile = void 0;
var ts_morph_1 = require("ts-morph");
function fuzzFile(filePath) {
    // Initialize ts-morph project
    var project = new ts_morph_1.Project({
        compilerOptions: {
            target: 3, // ES2018
        },
    });
    // Read the file
    var file = project.addSourceFileAtPath(filePath);
    // Apply different mutations
    mutateAdapters(file);
    mutateDevices(file);
    mutateBuffers(file);
    // Save the mutated file
    file.saveSync();
}
exports.fuzzFile = fuzzFile;
function mutateAdapters(file) {
    // Logic for mutating adapters goes here
    // ...
}
function mutateDevices(file) {
    // Logic for mutating devices goes here
    // ...
}
function mutateBuffers(file) {
    // Logic for mutating buffers goes here
    // e.g., randomly change size and usage
    file.forEachDescendant(function (node) {
        if (node.getKindName() === 'CallExpression' && node.getExpression().getText() === 'createBuffer') {
            var args = node.getArguments();
            var sizeProperty = args[0].getProperty('size');
            if (sizeProperty) {
                sizeProperty.setInitializer(Math.random() * 1000);
            }
            // Similarly, mutate other properties like usage
        }
    });
}
