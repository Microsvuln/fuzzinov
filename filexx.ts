import { NavigatorGPU, GPUDevice } from './gputypes';

declare global {
  interface Navigator extends NavigatorGPU {}
}

export {};
(async () => {

let device0: GPUDevice | undefined;
let device1: GPUDevice | undefined;
let device2: GPUDevice | undefined;
let device3: GPUDevice | undefined;
let device4: GPUDevice | undefined;
let device5: GPUDevice | undefined;

const adapter0 = await navigator.gpu.requestAdapter();
if (adapter0) {
  device0 = await adapter0.requestDevice();
}
// Repeat for other adapters

if (device4) {
  const buffer = device4.createBuffer({"mappedAtCreation":true,"size":9285,"usage":4});
}
if (device5) {
  const buffer1 = device5.createBuffer({"mappedAtCreation":true,"size":9605,"usage":4});
}
if (device2) {
  const buffer2 = device2.createBuffer({"mappedAtCreation":true,"size":5690,"usage":64});
}
if (device4) {
  const buffer3 = device4.createBuffer({"mappedAtCreation":true,"size":2944,"usage":4});
}
if (device0) {
  const buffer4 = device0.createBuffer({"mappedAtCreation":true,"size":3521,"usage":1});
}

})();
