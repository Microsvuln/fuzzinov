import { Project, SyntaxKind } from 'ts-morph';
export function fuzzFile(filePath) {
    // Initialize ts-morph project
    const project = new Project();
    // Read the file
    const file = project.addSourceFileAtPath(filePath);
    // Apply mutations
    mutateBuffers(file);
    // Save the mutated file
    file.saveSync();
}
function mutateBuffers(file) {
    file.forEachDescendant((node, traversal) => {
        var _a;
        // Skip nodes that are not CallExpressions
        if (node.getKind() !== SyntaxKind.CallExpression) {
            traversal.skip();
            return;
        }
        const callExpression = node;
        // Check if the call expression is calling createBuffer
        if (callExpression.getExpression().getText() !== 'createBuffer') {
            traversal.skip();
            return;
        }
        const args = callExpression.getArguments();
        if (args.length > 0) {
            const firstArg = args[0];
            // Modify the argument here
            if (firstArg.getKind() === SyntaxKind.ObjectLiteralExpression) {
                (_a = firstArg.getProperty('size')) === null || _a === void 0 ? void 0 : _a.setInitializer(Math.random() * 1000);
            }
        }
    });
}
