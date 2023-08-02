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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        // Here you would typically execute this code to get a real GPUAdapter object
        var adapter = null; // TODO: Replace with actual code to create or retrieve the adapter
        globalCtx.addAdapter(adapter);
        console.log(code);
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
        this.buffer = localCtx.device.createBuffer({
            size: this.size,
            usage: GPUBufferUsage.STORAGE,
        });
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
        var adapter = globalCtx.adapters[0]; // Example: use the first adapter
        var code = "const device".concat(this.id, " = await ").concat(adapter, ".requestDevice();");
        // Here you would typically execute this code to get a real GPUDevice object
        var device = null; // TODO: Replace with actual code to create or retrieve the device
        localCtx.setDevice(device);
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var globalCtx, localCtx, requestAdapterValue, requestAdapterValue2, adapterCode, adapterCode2;
        return __generator(this, function (_a) {
            globalCtx = new GlobalContext();
            localCtx = new LocalContext();
            requestAdapterValue = new RequestAdapterValue();
            requestAdapterValue2 = new RequestAdapterValue();
            adapterCode = requestAdapterValue.generate(globalCtx, localCtx);
            console.log('Code generation seems to be working : ', adapterCode);
            console.log(adapterCode); // This should print the generated code
            console.log('Hello Arash');
            adapterCode2 = requestAdapterValue2.generate(globalCtx, localCtx);
            return [2 /*return*/];
        });
    });
}
main().catch(function (error) {
    console.error(error);
});
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
