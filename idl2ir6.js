const webidl2 = require("webidl2");
const fs = require("fs");

const webAudioWebIDL = fs.readFileSync('./WebAudio.idl', 'utf-8');
const parsedWebIDL = webidl2.parse(webAudioWebIDL);


function generateValue(type, ctx) {
    switch (type) {
        case 'unsigned long':
            return 1;  // Generate a default unsigned long value
        case 'float':
            return 1.0;  // Generate a default float value
        case 'AudioContextOptions':
        case 'OfflineAudioContextOptions':
        case 'AudioBufferOptions':
        case 'AnalyserOptions':
        case 'AudioBufferSourceOptions':
        case 'OfflineAudioCompletionEventInit':
        case 'AudioProcessingEventInit':
        case 'BiquadFilterOptions':
        case 'ChannelMergerOptions':
        case 'ChannelSplitterOptions':
        case 'ConstantSourceOptions' :
        case 'ConvolverOptions' :
        case 'DelayOptions' :            
        case 'DynamicsCompressorOptions' :            
        case 'GainOptions' :            
        case 'IIRFilterOptions' :            
        case 'MediaElementAudioSourceOptions' :            
        case 'AudioNodeOptions' :
        case 'MediaStreamAudioSourceOptions' :
        case 'MediaStreamTrackAudioSourceOptions' :
        case 'OscillatorOptions' :
        case 'PannerOptions' :
        case 'PeriodicWaveOptions' :
        case 'StereoPannerOptions' :
        case 'WaveShaperOptions' :
        case 'AudioWorkletNodeOptions' :
        case 'MediaStreamAudioSourceOptions' :
        case 'MediaStreamAudioSourceOptions' :
            return '{}';  // Generate a default empty object for dictionary types
        case 'DOMString':
            return '"default"';  // Generate a default string value
        case 'BaseAudioContext':
        case 'AudioContext':
            return `new AudioContext(${generateValue('AudioContextOptions', ctx)})`;  // Generate a new AudioContext instance
        // Add cases for other types as needed
        default:
            throw new Error(`Don't know how to generate a value of type ${type}`);
    }
}
function generateFDIR(parsedWebIDL) {
  let fdirSource = '';

  fdirSource += `import Value  from './Value';\n`;
  fdirSource += `import GlobalContext from './GlobalContext';\n\n`;

  for (const item of parsedWebIDL) {
    if (item.type === 'interface') {
      const className = item.name;
      const idlName = item.name.replace(/([A-Z])/g, '-$1').toLowerCase();

      const constructors = item.members.filter(member => member.type === "constructor");
      const totalArgs = Math.max(...constructors.map(constructor => constructor.arguments.length), 0);

      fdirSource += `class ${className}Value extends Value {\n`;
      fdirSource += `  private _type: string = "${idlName}";\n`;
      fdirSource += `  private _id: number;\n`;
      fdirSource += `  private _parameters: any[];\n\n`;
      fdirSource += `  generate(ctx: GlobalContext): void {\n`;
      fdirSource += `    this._id = ctx.create${className}Id();\n`;

      if (constructors.length > 0) {
        // Choose a random constructor
        fdirSource += `    const constructorIndex = Math.floor(Math.random() * ${constructors.length});\n`;
        // Declare argument variables outside switch
        if (totalArgs > 0) {
          fdirSource += `    let ${Array.from({length: totalArgs}, (_, i) => 'arg' + i).join(', ')};\n`;
        }
        fdirSource += `    switch (constructorIndex) {\n`;

        constructors.forEach((constructor, index) => {
          fdirSource += `      case ${index}:\n`;
          constructor.arguments.forEach((argument, argumentIndex) => {
            if (argument.idlType.idlType === "AudioContext") {
              fdirSource += `        arg${argumentIndex} = "new AudioContext({})";\n`;
            } else {
              // Handle other types here
              fdirSource += `        arg${argumentIndex} = 123;\n`;  // Temporarily assign 123 as the value
            }
          });
          fdirSource += `        this._parameters = [${constructor.arguments.map((_, argumentIndex) => `arg${argumentIndex}`).join(", ")}];\n`;
          fdirSource += `        break;\n`;
        });

        fdirSource += `    }\n`;
      } else {
        fdirSource += `    this._parameters = [];\n`;
      }

      fdirSource += `  }\n\n`;
      fdirSource += `  mutate(ctx: GlobalContext): void {\n`;
      fdirSource += `    this.generate(ctx);\n`;
      fdirSource += `  }\n\n`;
      fdirSource += `  lower(): string {\n`;

      if (constructors.length > 0) {
        fdirSource += `    return \`const \${this._id} = new ${className}(\${this._parameters.join(", ")});\`;\n`;
      } else {
        fdirSource += `    return \`const \${this._id} = new ${className}();\`;\n`;
      }

      fdirSource += `  }\n`;
      fdirSource += `}\n\nexport {${className}Value};\n\n`;
    }
  }

  return fdirSource;
}



  let ctx = {};  // This is a simple empty object for the example

  console.log('hello');
  const fdirSource = generateFDIR(parsedWebIDL, ctx);
  /// console.log(parsedWebIDL);
  try {
    fs.writeFileSync('FD-IR.ts', fdirSource, 'utf-8');
  } catch (error) {
    console.error('Failed to write file:', error);
  }