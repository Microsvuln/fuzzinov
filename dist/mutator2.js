"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzFile = void 0;
const ts_morph_1 = require("ts-morph");
const fs = require("fs");
const path = require("path");
function fuzzFile(filePath) {
    const project = new ts_morph_1.Project({
        compilerOptions: {
            target: 3, // ES2018
        },
    });
    // Read the file
    const file = project.addSourceFileAtPath(filePath);
    // Apply different mutations
    mutateBuffers(file);
    // Save the mutated file to a new path
    const newPath = path.join(path.dirname(filePath), 'file1.ts');
    fs.writeFileSync(newPath, file.getFullText());
    console.log(`Saved mutated file to ${newPath}`);
}
exports.fuzzFile = fuzzFile;
function mutateBuffers(file) {
    file.forEachDescendant((node) => {
        if (ts_morph_1.CallExpression.isCallExpression(node)) {
            const callExpression = node;
            if (callExpression.getExpression().getText().endsWith('createBuffer')) {
                console.log('Found createBuffer call:', callExpression.getText());
                const args = callExpression.getArguments();
                if (args.length > 0 && ts_morph_1.ObjectLiteralExpression.isObjectLiteralExpression(args[0])) {
                    const firstArg = args[0];
                    const properties = firstArg.getProperties();
                    properties.forEach((property) => {
                        if (ts_morph_1.PropertyAssignment.isPropertyAssignment(property)) {
                            const nameNode = property.getNameNode();
                            if (nameNode && nameNode.getText() === 'size') {
                                const initializer = property.getInitializer();
                                if (initializer) {
                                    console.log('Changing size property from:', initializer.getText());
                                    const newSize = Math.floor(Math.random() * 1000) + 1;
                                    property.setInitializer(newSize.toString());
                                    console.log('Changed size property to:', newSize);
                                }
                            }
                        }
                    });
                }
            }
        }
    });
    file.saveSync();
}
