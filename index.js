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
        this.generatedCodeSnippets = [];
    }
    // Method to add an adapter
    GlobalContext.prototype.addAdapter = function (adapter) {
        this.adapters.push(adapter);
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
        this.device = null;
    }
    LocalContext.prototype.setDevice = function (device) {
        this.device = device;
    };
    return LocalContext;
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
    function GPUBufferDescriptorValue(size, usage) {
        var _this = _super.call(this) || this;
        _this.descriptor = {
            size: size,
            usage: usage,
        };
        return _this;
    }
    GPUBufferDescriptorValue.prototype.generate = function (globalCtx, localCtx) {
        // Assuming you have a method to get the current GPUDevice from the local context
        var device = localCtx.device;
        // Assuming you have a method to store generated code snippets in the global context
        var codeSnippet = "const buffer = device.createBuffer(".concat(JSON.stringify(this.descriptor), ");\nconsole.log(`Created buffer: ${buffer}`);");
        globalCtx.addGeneratedCode(codeSnippet);
    };
    GPUBufferDescriptorValue.prototype.mutate = function (ctx) {
        // Mutation logic for GPUBufferDescriptorValue
    };
    GPUBufferDescriptorValue.prototype.lower = function () {
        // Returns a string representation of a GPUBufferDescriptor
        return JSON.stringify(this.descriptor);
    };
    GPUBufferDescriptorValue.idCounter = 0;
    return GPUBufferDescriptorValue;
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
// Create a RequestAdapterValue instance
var requestAdapterValue = new RequestAdapterValue();
var requestAdapterValue2 = new RequestAdapterValue();
var requestAdapterValue3 = new RequestAdapterValue();
var requestAdapterValue4 = new RequestAdapterValue();
var requestAdapterValue5 = new RequestAdapterValue();
var requestAdapterValue6 = new RequestAdapterValue();
// Generate code and execute it
var adapterCode = requestAdapterValue.generate(globalCtx, localCtx);
//////console.log('Code generation seems to be working : ', adapterCode);
/////console.log(adapterCode); // This should print the generated code
/////console.log('Hello Arash');
var adapterCode2 = requestAdapterValue2.generate(globalCtx, localCtx);
var adapterCode3 = requestAdapterValue2.generate(globalCtx, localCtx);
var adapterCode4 = requestAdapterValue2.generate(globalCtx, localCtx);
var adapterCode5 = requestAdapterValue2.generate(globalCtx, localCtx);
var adapterCode6 = requestAdapterValue2.generate(globalCtx, localCtx);
var newDevice = new GPUDeviceValue();
var deviceCode = newDevice.generate(globalCtx, localCtx);
var newDevice1 = new GPUDeviceValue();
var deviceCode1 = newDevice1.generate(globalCtx, localCtx);
var newDevice2 = new GPUDeviceValue();
var deviceCode2 = newDevice2.generate(globalCtx, localCtx);
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
