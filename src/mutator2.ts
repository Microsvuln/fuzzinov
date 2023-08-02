import { Project, SourceFile, ObjectLiteralExpression, PropertyAssignment, SyntaxKind, CallExpression  } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

export function fuzzFile(filePath: string): void {
  const project = new Project({
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


function mutateBuffers(file: SourceFile) {
  file.forEachDescendant((node) => {
    if (CallExpression.isCallExpression(node)) {
      const callExpression = node as CallExpression;
      if (callExpression.getExpression().getText().endsWith('createBuffer')) {
        console.log('Found createBuffer call:', callExpression.getText());

        const args = callExpression.getArguments();
        if (args.length > 0 && ObjectLiteralExpression.isObjectLiteralExpression(args[0])) {
          const firstArg = args[0] as ObjectLiteralExpression;
          const properties = firstArg.getProperties();

          properties.forEach((property) => {
            if (PropertyAssignment.isPropertyAssignment(property)) {
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