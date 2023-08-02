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
var RequestAdapterValue = /** @class */ (function (_super) {
    __extends(RequestAdapterValue, _super);
    function RequestAdapterValue(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.id = RequestAdapterValue.idCounter++;
        return _this;
    }
    RequestAdapterValue.prototype.generate = function () {
        // Return a string of the code that should be run
        return "const adapter".concat(this.id, " = await gpu.requestAdapter(").concat(this.options ? JSON.stringify(this.options) : '', ");\n");
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
    GPUBufferValue.prototype.generate = function (ctx) {
        this.buffer = ctx.createBuffer({
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
    ReturnValue.prototype.generate = function (ctx) {
        if (this.buffer === null) {
            this.buffer = new GPUBufferValue(this.type);
            this.buffer.generate(ctx);
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
    GPUBufferDescriptorValue.prototype.generate = function (ctx) {
        // Return a string of the code that should be run
        /// return `const buffer = device.createBuffer(${JSON.stringify(this.descriptor)});\nconsole.log(\`Created buffer: \${buffer}\`);`;
        return "";
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
    GPUDeviceValue.prototype.generate = function () {
        var featuresString = ''; ///// this.features ? this.features.lower() : '';
        var limitsString = ''; //// this.limits ? this.limits.lower() : '';
        var queueString = ''; ///// this.queue ? this.queue.lower() : '';
        return "const device".concat(this.id, " = await adapter.requestDevice({ features: ").concat(featuresString, ", limits: ").concat(limitsString, ", queue: ").concat(queueString, " });");
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
var requestAdapterValue = new RequestAdapterValue();
console.log(requestAdapterValue.generate());
var requestAdapterValue1 = new RequestAdapterValue();
console.log(requestAdapterValue1.generate());
var descriptorValue = new GPUBufferDescriptorValue(1024, GPUBufferUsage.STORAGE);
var xGPUDeviceValue = new GPUDeviceValue();
var xcreateBuf = xGPUDeviceValue.createBuffer(descriptorValue);
console.log(xcreateBuf);
