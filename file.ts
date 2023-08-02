const adapter0 = await gpu.requestAdapter();

const adapter1 = await gpu.requestAdapter();

const adapter2 = await gpu.requestAdapter();

const adapter3 = await gpu.requestAdapter();

const adapter4 = await gpu.requestAdapter();

const adapter5 = await gpu.requestAdapter();

const device0 = await adapter4.requestDevice();
const device1 = await adapter2.requestDevice();
const device2 = await adapter5.requestDevice();
const device3 = await adapter5.requestDevice();
const device4 = await adapter2.requestDevice();
const device5 = await adapter4.requestDevice();
const device6 = await adapter2.requestDevice();
const device7 = await adapter4.requestDevice();
const device8 = await adapter1.requestDevice();
const device9 = await adapter4.requestDevice();
const buffer = device4.createBuffer({"mappedAtCreation":true,"size":655,"usage":4});
const buffer = device5.createBuffer({"mappedAtCreation":true,"size":508,"usage":4});
const buffer = device2.createBuffer({"mappedAtCreation":true,"size":717,"usage":64});
const buffer = device4.createBuffer({"mappedAtCreation":true,"size":385,"usage":4});
const buffer = device0.createBuffer({"mappedAtCreation":true,"size":685,"usage":1});