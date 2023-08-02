import { NavigatorGPU , GPURequestAdapterOptions, GPUBufferUsage, GPUBufferUsageFlags, GPUBufferDescriptor, GPU, GPUDevice, GPUBuffer } from './gputypes';
import * as webidl2 from 'webidl2';
import * as fs from 'fs';

// Load the WebIDL file
const webidl = fs.readFileSync('webgpu.idl', 'utf8');

// Parse the WebIDL
const parsed = webidl2.parse(webidl);

declare global {
    interface Navigator {
        gpu: GPU;
    }
}

// Find the GPUDevice interface
//// const GPUDevice = parsed.find(item => item.type === 'interface' && item.name === 'GPUDevice');


// Define base class Value
abstract class Value {
    abstract generate(ctx: GPUDevice): void;
    abstract mutate(ctx: GPUDevice): void;
    abstract lower(): string;
}

class GPUBufferValue extends Value {
    buffer: GPUBuffer;
    size: number;

    constructor(size: number) {
        super();
        this.size = size;
    }

    generate(ctx: GPUDevice) {
        this.buffer = ctx.createBuffer({
            size: this.size,
            usage: GPUBufferUsage.STORAGE,
        });
    }

    mutate(ctx: GPUDevice) {
        // For mutation, you can implement code to change the buffer's data or properties. 
        // This will depend on what you want to do for mutation.
    }

    lower() {
        // For this method, it's unclear what should be returned as string representation of a GPUBuffer.
        // Adjust as per your needs.
        return `GPUBuffer of size: ${this.size}`;
    }
}

class ReturnValue extends Value {
    type: any;
    buffer: GPUBufferValue | null = null;

    constructor(t: any) {
        super();
        this.type = t;
    }

    generate(ctx: GPUDevice) {
        if (this.buffer === null) {
            this.buffer = new GPUBufferValue(this.type);
            this.buffer.generate(ctx);
        }
    }

    mutate(ctx: GPUDevice) {
        if (this.buffer !== null) {
            this.buffer.mutate(ctx);
        }
    }

    lower() {
        if (this.buffer !== null) {
            return this.buffer.lower();
        }
        return '';
    }
}

// Define GPUBufferDescriptorValue class
class GPUBufferDescriptorValue extends Value {
    descriptor: GPUBufferDescriptor;

    constructor(size: number, usage: GPUBufferUsageFlags) {
        super();
        this.descriptor = {
            size: size,
            usage: usage
        };
    }

    generate(ctx: GPUDevice): string {
        // Return a string of the code that should be run
        /// return `const buffer = device.createBuffer(${JSON.stringify(this.descriptor)});\nconsole.log(\`Created buffer: \${buffer}\`);`;
        return `ctx.createBuffer(${JSON.stringify(this.descriptor)}});\n`;

    }

    mutate(ctx: GPUDevice): void {
        // Mutation logic for GPUBufferDescriptorValue
    }

    lower(): string {
        // Returns a string representation of a GPUBufferDescriptor
        return JSON.stringify(this.descriptor);
    }
}


class RequestAdapterValue extends Value {
    options: GPURequestAdapterOptions | undefined;

    constructor(options?: GPURequestAdapterOptions) {
        super();
        this.options = options;
    }

    generate(): string {
        // Return a string of the code that should be run
        return `const adapter = await gpu.requestAdapter(${this.options ? JSON.stringify(this.options) : ''});\n`;
    }

    mutate(): string {
        // As we don't have a clear use case for this method, we can simply return an empty string.
        return '';
    }

    lower() : string {
        return '';
    }
}


const requestAdapterValue = new RequestAdapterValue();
console.log(requestAdapterValue.generate());