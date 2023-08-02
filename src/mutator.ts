import { Project, SourceFile, ObjectLiteralExpression, PropertyAssignment, SyntaxKind, CallExpression  } from 'ts-morph';

export function fuzzFile(filePath: string): void {
  // Initialize ts-morph project
  const project = new Project();

  // Read the file
  const file = project.addSourceFileAtPath(filePath);

  // Apply mutations
  mutateBuffers(file);

  // Save the mutated file
  file.saveSync();
}

function mutateBuffers(file: SourceFile) {
  file.forEachDescendant((node, traversal) => {
    // Skip nodes that are not CallExpressions
    if (node.getKind() !== SyntaxKind.CallExpression) {
      traversal.skip();
      return;
    }

    const callExpression = node as CallExpression;

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
        firstArg.getProperty('size')?.setInitializer(Math.random() * 1000);
      }
    }
  });
}