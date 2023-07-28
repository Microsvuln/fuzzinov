import { NavigatorGPU,GPUAdapter,GPUQueue ,GPUSupportedLimits,GPUTextureDescriptor,GPUSupportedFeatures,GPURequestAdapterOptions, GPUBufferUsageFlags, GPUBufferDescriptor, GPU, GPUDevice, GPUBuffer } from './gputypes';
import * as fs from 'fs';


// Parse the WebIDL

declare global {
    interface Navigator {
        gpu: GPU;
    }
}

abstract class Value {
    abstract generate(ctx: GPUDevice): void;
    abstract mutate(ctx: GPUDevice): void;
    abstract lower(): string;
}

class GPUBufferUsage {
    static readonly MAP_READ: number = 0x0001;
    static readonly MAP_WRITE: number = 0x0002;
    static readonly COPY_SRC: number = 0x0004;
    static readonly COPY_DST: number = 0x0008;
    static readonly INDEX: number = 0x0010;
    static readonly VERTEX: number = 0x0020;
    static readonly UNIFORM: number = 0x0040;
    static readonly STORAGE: number = 0x0080;
    static readonly INDIRECT: number = 0x0100;
    static readonly QUERY_RESOLVE: number = 0x0200;
}

class RequestAdapterValue extends Value {
    options: GPURequestAdapterOptions | undefined;
    id: number;
    static idCounter = 0;

    constructor(options?: GPURequestAdapterOptions) {
        super();
        this.options = options;
        this.id = RequestAdapterValue.idCounter++;
    }

    generate(): string {
        // Return a string of the code that should be run
        return `const adapter${this.id} = await gpu.requestAdapter(${this.options ? JSON.stringify(this.options) : ''});\n`;
    }

    mutate(): string {
        // As we don't have a clear use case for this method, we can simply return an empty string.
        return '';
    }

    lower() : string {
        return JSON.stringify(this.options);
    }
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
    options: GPURequestAdapterOptions | undefined;
    id: number;
    static idCounter = 0;


    constructor(size: number, usage: GPUBufferUsageFlags) {
        super();
        this.descriptor = {
            size: size,
            usage: usage,

        };
    }

    generate(ctx: GPUDevice): string {
        // Return a string of the code that should be run
        /// return `const buffer = device.createBuffer(${JSON.stringify(this.descriptor)});\nconsole.log(\`Created buffer: \${buffer}\`);`;
        return ``;

    }

    mutate(ctx: GPUDevice): void {
        // Mutation logic for GPUBufferDescriptorValue
    }

    lower(): string {
        // Returns a string representation of a GPUBufferDescriptor
        return JSON.stringify(this.descriptor);
    }
}



class GPUDeviceValue extends Value {
    // Assuming we have corresponding Value classes for these types
    features: GPUSupportedFeatures | undefined;
    limits: GPUSupportedLimits | undefined;
    //// queue: GPUQueue | undefined;
    static idCounter = 0;
    id: number;

    constructor() {
        super();
        this.id = GPUDeviceValue.idCounter++;
    }

    generate(): string {
        const featuresString = ''; ///// this.features ? this.features.lower() : '';
        const limitsString = ''; //// this.limits ? this.limits.lower() : '';
        const queueString = '';  ///// this.queue ? this.queue.lower() : '';

        return `const device${this.id} = await adapter.requestDevice({ features: ${featuresString}, limits: ${limitsString}, queue: ${queueString} });`;
    }

    // Destroy the device
    destroy(): string {
        return `device${this.id}.destroy();`;
    }

    // Create a GPUBuffer
    createBuffer(descriptor: GPUBufferDescriptorValue): string {
        return `const buffer${this.id} = device${this.id}.createBuffer(${descriptor.lower()});`;
    }

 



    lower(): string {
        return `GPUDevice instance: device${this.id}`;
    }

    mutate(): string {
        // As we don't have a clear use case for this method, we can simply return an empty string.
        return '';
    }
}


const requestAdapterValue = new RequestAdapterValue();
console.log(requestAdapterValue.generate());


const requestAdapterValue1 = new RequestAdapterValue();
console.log(requestAdapterValue1.generate());


const descriptorValue = new GPUBufferDescriptorValue(1024, GPUBufferUsage.STORAGE);
const xGPUDeviceValue = new GPUDeviceValue();
const xcreateBuf = xGPUDeviceValue.createBuffer(descriptorValue);

console.log(xcreateBuf);
