"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(async () => {
    let device0;
    let device1;
    let device2;
    let device3;
    let device4;
    let device5;
    const adapter0 = await navigator.gpu.requestAdapter();
    if (adapter0) {
        device0 = await adapter0.requestDevice();
    }
    // Repeat for other adapters
    if (device4) {
        const buffer = device4.createBuffer({ "mappedAtCreation": true, "size": 655, "usage": 4 });
    }
    if (device5) {
        const buffer1 = device5.createBuffer({ "mappedAtCreation": true, "size": 508, "usage": 4 });
    }
    if (device2) {
        const buffer2 = device2.createBuffer({ "mappedAtCreation": true, "size": 717, "usage": 64 });
    }
    if (device4) {
        const buffer3 = device4.createBuffer({ "mappedAtCreation": true, "size": 385, "usage": 4 });
    }
    if (device0) {
        const buffer4 = device0.createBuffer({ "mappedAtCreation": true, "size": 685, "usage": 1 });
    }
})();
