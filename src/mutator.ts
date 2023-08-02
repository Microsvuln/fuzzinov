import { Project, SyntaxKind } from "ts-morph";

const project = new Project();
const sourceFile = project.addSourceFileAtPath("./file.ts");

sourceFile.forEachDescendant((node) => {
  if (node.getKind() === SyntaxKind.CallExpression) {
    const callExpr = node.asKind(SyntaxKind.CallExpression);
    const expression = callExpr.getExpression();

    console.log("Examining expression:", expression.getText()); // Debug line

    if (expression.getText().endsWith(".createBuffer")) {
      console.log("Found createBuffer call"); // Debug line
      
      const args = callExpr.getArguments();
      if (args.length > 0 && args[0].getKind() === SyntaxKind.ObjectLiteralExpression) {
        console.log("Found object literal argument"); // Debug line
        
        const objectLiteral = args[0].asKind(SyntaxKind.ObjectLiteralExpression);
        objectLiteral.getProperties().forEach((property) => {
          if (property.getKind() === SyntaxKind.PropertyAssignment) {
            const propertyAssignment = property.asKind(SyntaxKind.PropertyAssignment);
            /// const propertyName = propertyAssignment.getName().trim();
            const propertyName = propertyAssignment.getName().trim().replace(/"/g, "");
            console.log("Found property:", propertyName); // Debug line
            console.log("Type : ", typeof(propertyName)); // Debug line
            console.log("ASCII values:", propertyName.split('').map(c => c.charCodeAt(0))); // Debug line for ASCII values
            console.log("Comparing to 'size':", propertyName === "size"); // Debug line for comparison
            
            if (propertyName === "size") {
              console.log("Changing size property");
              const oldValue = propertyAssignment.getInitializer().getText();
              const newValue = +(oldValue as string) + 1;
              console.log("Old value:", oldValue);
              propertyAssignment.setInitializer(newValue.toString());
            }
            
          }
        });
        
      } else {
        console.log("No object literal argument found"); // Debug line
      }
    } else {
      console.log("Not a createBuffer call"); // Debug line
    }
  }
});


const newContent = sourceFile.getFullText(); // Get the modified content

// Print the modified content for verification
console.log("Modified content:");
console.log(newContent);

// Create a new file with the modified content
const newSourceFile = project.createSourceFile("./filexx.ts", newContent);

// Save the new file
newSourceFile.saveSync();
