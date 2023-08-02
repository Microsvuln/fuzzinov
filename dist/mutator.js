"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const project = new ts_morph_1.Project();
// Add the source file you want to manipulate
const sourceFile = project.addSourceFileAtPath("file.ts");
// Search for the specific call expressions
sourceFile.forEachDescendant((node) => {
    if (node.getKindName() === "CallExpression") {
        const callExpr = node;
        const expression = callExpr.getExpression();
        if (expression.getText().endsWith(".createBuffer")) {
            const args = callExpr.getArguments();
            if (args.length > 0 && args[0].getKindName() === "ObjectLiteralExpression") {
                const objectLiteral = args[0];
                objectLiteral.getProperties().forEach((property) => {
                    if (property.getName() === "size") {
                        // Modify the size property here
                        const sizeAssignment = property;
                        sizeAssignment.setInitializer("1234"); // Set to the new size value
                    }
                });
            }
        }
    }
});
// Save the changes
sourceFile.saveSync();
