"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Value = /** @class */ (function () {
    function Value() {
    }
    return Value;
}());
var GPUBufferUsage = /** @class */ (function () {
    function GPUBufferUsage() {
    }
    GPUBufferUsage.MAP_READ = 0x0001;
    GPUBufferUsage.MAP_WRITE = 0x0002;
    GPUBufferUsage.COPY_SRC = 0x0004;
    GPUBufferUsage.COPY_DST = 0x0008;
    GPUBufferUsage.INDEX = 0x0010;
    GPUBufferUsage.VERTEX = 0x0020;
    GPUBufferUsage.UNIFORM = 0x0040;
    GPUBufferUsage.STORAGE = 0x0080;
    GPUBufferUsage.INDIRECT = 0x0100;
    GPUBufferUsage.QUERY_RESOLVE = 0x0200;
    return GPUBufferUsage;
}());
var GlobalContext = /** @class */ (function () {
    function GlobalContext() {
        // Global variables and methods go here
        this.adapters = [];
        this.gpuBuffers = [];
        this.arrayBuffers = [];
        this.generatedCodeSnippets = [];
        this.UintArrays = [];
    }
    // Method to add an adapter
    GlobalContext.prototype.addAdapter = function (adapter) {
        this.adapters.push(adapter);
    };
    GlobalContext.prototype.addUintArray = function (UintArray) {
        this.UintArrays.push(UintArray);
    };
    GlobalContext.prototype.addArrayBuffer = function (arrayBuffer) {
        this.arrayBuffers.push(arrayBuffer);
    };
    GlobalContext.prototype.addGpuBuffer = function (gpuBuffer) {
        this.gpuBuffers.push(gpuBuffer);
    };
    GlobalContext.prototype.addGeneratedCode = function (snippet) {
        this.generatedCodeSnippets.push(snippet);
    };
    // Optional: Method to retrieve all generated code snippets
    GlobalContext.prototype.getAllGeneratedCode = function () {
        return this.generatedCodeSnippets.join('\n');
    };
    return GlobalContext;
}());
var LocalContext = /** @class */ (function () {
    function LocalContext() {
        this.device = null; // Define as an array of strings or null
        this.gpuBuffer = null;
        this.arrayBuffer = null;
    }
    LocalContext.prototype.setDevice = function (device) {
        if (this.device === null) {
            this.device = [];
        }
        this.device.push(device); // Add device to the array
    };
    LocalContext.prototype.setGpuBuffers = function (gpuBuffer) {
        if (this.gpuBuffer == null) {
            this.gpuBuffer = [];
        }
        this.gpuBuffer.push(gpuBuffer);
    };
    LocalContext.prototype.setArrayBuffers = function (arrayBuffer) {
        if (this.arrayBuffer == null) {
            this.arrayBuffer = [];
        }
        this.arrayBuffer.push(arrayBuffer);
    };
    return LocalContext;
}());
var MyGPUDevice = /** @class */ (function () {
    function MyGPUDevice() {
        this.randVar = Math.floor(Math.random() * 1000) + 1;
        this.id = this.randVar;
        // Generate a random size (e.g., between 1 and 1000)
        var size = Math.floor(Math.random() * 1000) + 1;
        // Generate a random usage flag by selecting a random combination of the available flags
        var usageFlags = [
            GPUBufferUsage.MAP_READ,
            GPUBufferUsage.MAP_WRITE,
            GPUBufferUsage.COPY_SRC,
            GPUBufferUsage.COPY_DST,
            GPUBufferUsage.INDEX,
            GPUBufferUsage.VERTEX,
            GPUBufferUsage.UNIFORM,
            GPUBufferUsage.STORAGE,
            GPUBufferUsage.INDIRECT,
            GPUBufferUsage.QUERY_RESOLVE,
        ];
    }
    MyGPUDevice.prototype.createBuffer = function (descriptor) {
        // For this example, let's return a dummy GPUBuffer object with a reference to the descriptor.
        // You can expand upon this to better suit your needs.
        return {};
        // ... other necessary properties and methods to match the GPUBuffer type ...
    };
    MyGPUDevice.prototype.generateBufferCode = function (globalCtx, localCtx) {
        if (Array.isArray(localCtx.device) && localCtx.device.length > 0) {
            var randomIndex = Math.floor(Math.random() * localCtx.device.length);
            var deviceVar = localCtx.device[randomIndex];
            // Generate the code snippet
            var codeSnippet = "const buffer".concat(this.id, " = ").concat(deviceVar, ".createBuffer(").concat(JSON.stringify(this.descriptor), ");");
            var buffer = "buffer".concat(this.id);
            globalCtx.addGpuBuffer(buffer);
            localCtx.setGpuBuffers(buffer);
            globalCtx.addGeneratedCode(codeSnippet);
            console.log(codeSnippet);
        }
        else {
            throw new Error('No devices found in the local context.');
        }
    };
    MyGPUDevice.idCounter = 0;
    return MyGPUDevice;
}());
var RequestAdapterValue = /** @class */ (function (_super) {
    __extends(RequestAdapterValue, _super);
    function RequestAdapterValue(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.id = RequestAdapterValue.idCounter++;
        return _this;
    }
    RequestAdapterValue.prototype.generate = function (globalCtx, localCtx) {
        var code = "const adapter".concat(this.id, " = await gpu.requestAdapter(").concat(this.options ? JSON.stringify(this.options) : '', ");\n");
        var adapter = "adapter".concat(this.id);
        globalCtx.addAdapter(adapter);
        console.log(code);
        return adapter;
    };
    RequestAdapterValue.prototype.mutate = function () {
        // As we don't have a clear use case for this method, we can simply return an empty string.
        return '';
    };
    RequestAdapterValue.prototype.lower = function () {
        return JSON.stringify(this.options);
    };
    RequestAdapterValue.idCounter = 0;
    return RequestAdapterValue;
}(Value));
var GPUBufferValue = /** @class */ (function (_super) {
    __extends(GPUBufferValue, _super);
    function GPUBufferValue(size) {
        var _this = _super.call(this) || this;
        _this.size = size;
        return _this;
    }
    GPUBufferValue.prototype.generate = function (globalCtx, localCtx) {
        var deviceVar = localCtx.device; // assuming this is a string representing the variable name
        if (deviceVar === null) {
            throw new Error('Device is not set in local context.');
        }
        return "const buffer = ".concat(deviceVar, ".createBuffer({\n            size: ").concat(this.size, ",\n            usage: GPUBufferUsage.STORAGE,\n        });\nconsole.log(`Created buffer: ${buffer}`);");
    };
    GPUBufferValue.prototype.mutate = function (ctx) {
        // For mutation, you can implement code to change the buffer's data or properties. 
        // This will depend on what you want to do for mutation.
    };
    GPUBufferValue.prototype.lower = function () {
        // For this method, it's unclear what should be returned as string representation of a GPUBuffer.
        // Adjust as per your needs.
        return "GPUBuffer of size: ".concat(this.size);
    };
    return GPUBufferValue;
}(Value));
var ReturnValue = /** @class */ (function (_super) {
    __extends(ReturnValue, _super);
    function ReturnValue(t) {
        var _this = _super.call(this) || this;
        _this.buffer = null;
        _this.type = t;
        return _this;
    }
    ReturnValue.prototype.generate = function (globalCtx, localCtx) {
        if (this.buffer === null) {
            this.buffer = new GPUBufferValue(this.type);
            this.buffer.generate(globalCtx, localCtx);
        }
    };
    ReturnValue.prototype.mutate = function (ctx) {
        if (this.buffer !== null) {
            this.buffer.mutate(ctx);
        }
    };
    ReturnValue.prototype.lower = function () {
        if (this.buffer !== null) {
            return this.buffer.lower();
        }
        return '';
    };
    return ReturnValue;
}(Value));
// Define GPUBufferDescriptorValue class
var GPUBufferDescriptorValue = /** @class */ (function (_super) {
    __extends(GPUBufferDescriptorValue, _super);
    function GPUBufferDescriptorValue() {
        var _this = _super.call(this) || this;
        _this.randVar = Math.floor(Math.random() * 1000) + 1;
        _this.id = _this.randVar;
        // Generate a random size (e.g., between 1 and 1000)
        var size = Math.floor(Math.random() * 1000) + 1;
        // Generate a random usage flag by selecting a random combination of the available flags
        var usageFlags = [
            GPUBufferUsage.MAP_READ,
            GPUBufferUsage.MAP_WRITE,
            GPUBufferUsage.COPY_SRC,
            GPUBufferUsage.COPY_DST,
            GPUBufferUsage.INDEX,
            GPUBufferUsage.VERTEX,
            GPUBufferUsage.UNIFORM,
            GPUBufferUsage.STORAGE,
            GPUBufferUsage.INDIRECT,
            GPUBufferUsage.QUERY_RESOLVE,
        ];
        var usage = usageFlags[Math.floor(Math.random() * usageFlags.length)];
        // Ensure MAP_READ and MAP_WRITE conditions
        if (usage & GPUBufferUsage.MAP_READ) {
            usage = GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST;
        }
        if (usage & GPUBufferUsage.MAP_WRITE) {
            usage = GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC;
        }
        // Randomize mappedAtCreation
        var mappedAtCreation = Math.random() < 0.5;
        _this.descriptor = {
            mappedAtCreation: mappedAtCreation,
            size: mappedAtCreation ? size - (size % 4) + 4 : size,
            usage: usage,
        };
        return _this;
    }
    GPUBufferDescriptorValue.prototype.generate = function (globalCtx, localCtx) {
        // Check if localCtx.device is an array and not null
        if (Array.isArray(localCtx.device) && localCtx.device.length > 0) {
            var randomIndex = Math.floor(Math.random() * localCtx.device.length);
            var deviceVar = localCtx.device[randomIndex];
            // Generate the code snippet
            var codeSnippet = "const buffer".concat(this.id, " = ").concat(deviceVar, ".createBuffer(").concat(JSON.stringify(this.descriptor), ");");
            var buffer = "buffer".concat(this.id);
            globalCtx.addGpuBuffer(buffer);
            localCtx.setGpuBuffers(buffer);
            globalCtx.addGeneratedCode(codeSnippet);
            console.log(codeSnippet);
        }
        else {
            throw new Error('No devices found in the local context.');
        }
    };
    GPUBufferDescriptorValue.prototype.mutate = function () {
        return '';
        // Mutation logic for GPUBufferDescriptorValue
    };
    GPUBufferDescriptorValue.prototype.lower = function () {
        // Returns a string representation of a GPUBufferDescriptor
        return JSON.stringify(this.descriptor);
    };
    GPUBufferDescriptorValue.idCounter = 0;
    return GPUBufferDescriptorValue;
}(Value));
// Define GPUBufferDescriptorValue class
var GPUBuffeMappedRange = /** @class */ (function (_super) {
    __extends(GPUBuffeMappedRange, _super);
    function GPUBuffeMappedRange() {
        var _this = _super.call(this) || this;
        _this.randVar = Math.floor(Math.random() * 1000) + 1;
        _this.id = _this.randVar;
        // Generate a random size (e.g., between 1 and 1000)
        var size = Math.floor(Math.random() * 1000) + 1;
        return _this;
    }
    GPUBuffeMappedRange.prototype.generate = function (globalCtx, localCtx) {
        // Check if localCtx.device is an array and not null
        if (Array.isArray(localCtx.gpuBuffer) && localCtx.gpuBuffer.length > 0) {
            var randomIndexGpuBuffers = Math.floor(Math.random() * localCtx.gpuBuffer.length);
            var bufferVar = localCtx.gpuBuffer[randomIndexGpuBuffers];
            // Generate the code snippet
            var codeSnippet = "const arrayBuffer".concat(this.id, " = ").concat(bufferVar, ".getMappedRange();");
            var arrayBuffer = "arrayBuffer".concat(this.id);
            //// const code = `const adapter${this.id} = await gpu.requestAdapter(${this.options ? JSON.stringify(this.options) : ''});\n`;
            globalCtx.addArrayBuffer(arrayBuffer);
            localCtx.setArrayBuffers(arrayBuffer);
            globalCtx.addGeneratedCode(codeSnippet);
            console.log(codeSnippet);
        }
        else {
            throw new Error('No gpuBuffer found in the local context.');
        }
    };
    GPUBuffeMappedRange.prototype.mutate = function () {
        return '';
        // Mutation logic for GPUBufferDescriptorValue
    };
    GPUBuffeMappedRange.prototype.lower = function () {
        // Returns a string representation of a GPUBufferDescriptor
        return JSON.stringify(this.descriptor);
    };
    GPUBuffeMappedRange.idCounter = 0;
    return GPUBuffeMappedRange;
}(Value));
var setUintArray = /** @class */ (function (_super) {
    __extends(setUintArray, _super);
    function setUintArray() {
        var _this = _super.call(this) || this;
        _this.lengthOptions = [8, 16, 32, 64, 128];
        _this.randVar = Math.floor(Math.random() * 1000) + 1;
        _this.id = _this.randVar;
        _this.selectedLength = _this.lengthOptions[Math.floor(Math.random() * _this.lengthOptions.length)];
        return _this;
    }
    setUintArray.prototype.generate = function (globalCtx, localCtx) {
        if (Array.isArray(localCtx.arrayBuffer) && localCtx.arrayBuffer.length > 0) {
            var randomIndexArrayBuffer = Math.floor(Math.random() * localCtx.arrayBuffer.length);
            var randomArrayBuffer = localCtx.arrayBuffer[randomIndexArrayBuffer];
            console.log('Length for array is : ', this.selectedLength);
            var codeSnippet = "const Uint".concat(this.selectedLength, "Array").concat(this.id, " = new Uint").concat(this.selectedLength, "Array(").concat(randomArrayBuffer, ").set([0, 1, 2, 3]);");
            var uIntArray = "Uint".concat(this.selectedLength, "Array").concat(this.id);
            globalCtx.addUintArray(uIntArray);
            //// const code = `const adapter${this.id} = await gpu.requestAdapter(${this.options ? JSON.stringify(this.options) : ''});\n`;
            //// globalCtx.addArrayBuffer(arrayBuffer);
            globalCtx.addGeneratedCode(codeSnippet);
            console.log(codeSnippet);
        }
        else {
            throw new Error('No arrayBuffer found in the local context.');
        }
    };
    setUintArray.prototype.mutate = function () {
        return '';
        // Mutation logic for GPUBufferDescriptorValue
    };
    setUintArray.prototype.lower = function () {
        // Returns a string representation of a GPUBufferDescriptor
        return '';
    };
    setUintArray.idCounter = 0;
    return setUintArray;
}(Value));
var SimulatedAdapter = /** @class */ (function () {
    function SimulatedAdapter() {
    }
    // Properties representing the state of the adapter
    // Method to simulate requesting a device
    SimulatedAdapter.prototype.requestDevice = function () {
        return 'simulatedDevice';
    };
    return SimulatedAdapter;
}());
var GPUDeviceValue = /** @class */ (function (_super) {
    __extends(GPUDeviceValue, _super);
    function GPUDeviceValue() {
        var _this = _super.call(this) || this;
        _this.id = GPUDeviceValue.idCounter++;
        return _this;
    }
    GPUDeviceValue.prototype.generate = function (globalCtx, localCtx) {
        if (globalCtx.adapters.length === 0) {
            throw new Error("No adapters available.");
        }
        // Select a random adapter from the available adapters
        var randomIndex = Math.floor(Math.random() * globalCtx.adapters.length);
        var adapter = globalCtx.adapters[randomIndex];
        localCtx.setDevice("device".concat(this.id));
        var code = "const device".concat(this.id, " = await ").concat(adapter, ".requestDevice();");
        console.log(code);
    };
    // Destroy the device
    GPUDeviceValue.prototype.destroy = function () {
        return "device".concat(this.id, ".destroy();");
    };
    // Create a GPUBuffer
    GPUDeviceValue.prototype.createBuffer = function (descriptor) {
        return "const buffer".concat(this.id, " = device").concat(this.id, ".createBuffer(").concat(descriptor.lower(), ");");
    };
    GPUDeviceValue.prototype.lower = function () {
        return "GPUDevice instance: device".concat(this.id);
    };
    GPUDeviceValue.prototype.mutate = function () {
        // As we don't have a clear use case for this method, we can simply return an empty string.
        return '';
    };
    //// queue: GPUQueue | undefined;
    GPUDeviceValue.idCounter = 0;
    return GPUDeviceValue;
}(Value));
var globalCtx = new GlobalContext();
var localCtx = new LocalContext();
for (var i = 0; i < 6; i++) {
    // Create a RequestAdapterValue instance to generate an adapter
    var requestAdapterValue = new RequestAdapterValue();
    requestAdapterValue.generate(globalCtx, localCtx);
}
for (var i = 0; i < 10; i++) {
    // Create a RequestAdapterValue instance to generate an adapter
    var gpuDeviceValue = new GPUDeviceValue();
    gpuDeviceValue.generate(globalCtx, localCtx);
}
for (var i = 0; i < 5; i++) {
    //// const requestAdapterValue10 = new RequestAdapterValue();
    ///// requestAdapterValue10.generate(globalCtx, localCtx);
    //// const gpuDeviceValue20 = new GPUDeviceValue();
    ///// gpuDeviceValue20.generate(globalCtx, localCtx);
    var gpuBuffers1 = new GPUBufferDescriptorValue();
    gpuBuffers1.generate(globalCtx, localCtx);
}
for (var i = 0; i < 3; i++) {
    var gpuBufferGetMappedrange = new GPUBuffeMappedRange();
    gpuBufferGetMappedrange.generate(globalCtx, localCtx);
}
for (var i = 0; i < 2; i++) {
    var uintArraySample = new setUintArray();
    uintArraySample.generate(globalCtx, localCtx);
}
// Create a GPUDeviceValue instance to generate a device
// Execute the generated code, assuming you have logic in the generate method to actually request an adapter
// ...
// Continue with the rest of your logic
// ...
/*
const requestAdapterValue = new RequestAdapterValue();
console.log(requestAdapterValue.generate());


const requestAdapterValue1 = new RequestAdapterValue();
console.log(requestAdapterValue1.generate());


const descriptorValue = new GPUBufferDescriptorValue(1024, GPUBufferUsage.STORAGE);
const xGPUDeviceValue = new GPUDeviceValue();
const xcreateBuf = xGPUDeviceValue.createBuffer(descriptorValue);

console.log(xcreateBuf);

*/ 
