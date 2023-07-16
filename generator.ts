import * as fdIr from "./FD-IR";
import GlobalContext from './GlobalContext';
import { FdIrClass } from './FdIrClass';



// First, create a global context. This could be as simple as an object literal,
// but in real use, you might want to include more complex state.



let ctx = new GlobalContext();

 let id = 0; // or whatever initial value you want
 let name = 'someName'; // replace with actual value
 let value = 'someValue'; // replace with actual value



// Instantiate an object for each class in FD-IR
//// const instances = Object.values(fdIr).map(FdIrClass => new FdIrClass());
//// const instances = Object.values(fdIr).map(FdIrClass => new FdIrClass(id, name, value));  // assuming `id`, `name`, `value` are defined.
const instances = Object.values(fdIr).map(FdIrClass => new FdIrClass(id, name, value));


instances.forEach(instance => instance.generate(ctx));

// Run the generate method for each instance
//// instances.forEach(instance => instance.generate(ctx));

// Then you can run a number of iterations where you randomly select an instance
// and run the mutate method on it.
for (let i = 0; i < 100; i++) {
  const instance = instances[Math.floor(Math.random() * instances.length)];
  instance.mutate(ctx);
}

// Finally, use the lower method to get a string representation of the code
const loweredCode = instances.map(instance => instance.lower()).join("\n");

// You can then write the lowered code to a file, or execute it, or use it however you need.
console.log(loweredCode);
