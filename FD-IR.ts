import Value  from './Value';
import GlobalContext from './GlobalContext';

class BaseAudioContextValue extends Value {
  private _type: string = "-base-audio-context";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createBaseAudioContextId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new BaseAudioContext();`;
  }
}

export {BaseAudioContextValue};

class AudioContextValue extends Value {
  private _type: string = "-audio-context";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioContextId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        this._parameters = [arg0];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioContext(${this._parameters.join(", ")});`;
  }
}

export {AudioContextValue};

class OfflineAudioContextValue extends Value {
  private _type: string = "-offline-audio-context";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createOfflineAudioContextId();
    const constructorIndex = Math.floor(Math.random() * 2);
    let arg0, arg1, arg2;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        this._parameters = [arg0];
        break;
      case 1:
        arg0 = 123;
        arg1 = 123;
        arg2 = 123;
        this._parameters = [arg0, arg1, arg2];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new OfflineAudioContext(${this._parameters.join(", ")});`;
  }
}

export {OfflineAudioContextValue};

class OfflineAudioCompletionEventValue extends Value {
  private _type: string = "-offline-audio-completion-event";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createOfflineAudioCompletionEventId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new OfflineAudioCompletionEvent(${this._parameters.join(", ")});`;
  }
}

export {OfflineAudioCompletionEventValue};

class AudioBufferValue extends Value {
  private _type: string = "-audio-buffer";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioBufferId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        this._parameters = [arg0];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioBuffer(${this._parameters.join(", ")});`;
  }
}

export {AudioBufferValue};

class AudioNodeValue extends Value {
  private _type: string = "-audio-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioNodeId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioNode();`;
  }
}

export {AudioNodeValue};

class AudioParamValue extends Value {
  private _type: string = "-audio-param";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioParamId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioParam();`;
  }
}

export {AudioParamValue};

class AudioScheduledSourceNodeValue extends Value {
  private _type: string = "-audio-scheduled-source-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioScheduledSourceNodeId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioScheduledSourceNode();`;
  }
}

export {AudioScheduledSourceNodeValue};

class AnalyserNodeValue extends Value {
  private _type: string = "-analyser-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAnalyserNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AnalyserNode(${this._parameters.join(", ")});`;
  }
}

export {AnalyserNodeValue};

class AudioBufferSourceNodeValue extends Value {
  private _type: string = "-audio-buffer-source-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioBufferSourceNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioBufferSourceNode(${this._parameters.join(", ")});`;
  }
}

export {AudioBufferSourceNodeValue};

class AudioDestinationNodeValue extends Value {
  private _type: string = "-audio-destination-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioDestinationNodeId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioDestinationNode();`;
  }
}

export {AudioDestinationNodeValue};

class AudioListenerValue extends Value {
  private _type: string = "-audio-listener";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioListenerId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioListener();`;
  }
}

export {AudioListenerValue};

class AudioProcessingEventValue extends Value {
  private _type: string = "-audio-processing-event";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioProcessingEventId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioProcessingEvent(${this._parameters.join(", ")});`;
  }
}

export {AudioProcessingEventValue};

class BiquadFilterNodeValue extends Value {
  private _type: string = "-biquad-filter-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createBiquadFilterNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new BiquadFilterNode(${this._parameters.join(", ")});`;
  }
}

export {BiquadFilterNodeValue};

class ChannelMergerNodeValue extends Value {
  private _type: string = "-channel-merger-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createChannelMergerNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new ChannelMergerNode(${this._parameters.join(", ")});`;
  }
}

export {ChannelMergerNodeValue};

class ChannelSplitterNodeValue extends Value {
  private _type: string = "-channel-splitter-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createChannelSplitterNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new ChannelSplitterNode(${this._parameters.join(", ")});`;
  }
}

export {ChannelSplitterNodeValue};

class ConstantSourceNodeValue extends Value {
  private _type: string = "-constant-source-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createConstantSourceNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new ConstantSourceNode(${this._parameters.join(", ")});`;
  }
}

export {ConstantSourceNodeValue};

class ConvolverNodeValue extends Value {
  private _type: string = "-convolver-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createConvolverNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new ConvolverNode(${this._parameters.join(", ")});`;
  }
}

export {ConvolverNodeValue};

class DelayNodeValue extends Value {
  private _type: string = "-delay-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createDelayNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new DelayNode(${this._parameters.join(", ")});`;
  }
}

export {DelayNodeValue};

class DynamicsCompressorNodeValue extends Value {
  private _type: string = "-dynamics-compressor-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createDynamicsCompressorNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new DynamicsCompressorNode(${this._parameters.join(", ")});`;
  }
}

export {DynamicsCompressorNodeValue};

class GainNodeValue extends Value {
  private _type: string = "-gain-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createGainNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new GainNode(${this._parameters.join(", ")});`;
  }
}

export {GainNodeValue};

class IIRFilterNodeValue extends Value {
  private _type: string = "-i-i-r-filter-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createIIRFilterNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new IIRFilterNode(${this._parameters.join(", ")});`;
  }
}

export {IIRFilterNodeValue};

class MediaElementAudioSourceNodeValue extends Value {
  private _type: string = "-media-element-audio-source-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createMediaElementAudioSourceNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = "new AudioContext({})";
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new MediaElementAudioSourceNode(${this._parameters.join(", ")});`;
  }
}

export {MediaElementAudioSourceNodeValue};

class MediaStreamAudioDestinationNodeValue extends Value {
  private _type: string = "-media-stream-audio-destination-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createMediaStreamAudioDestinationNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = "new AudioContext({})";
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new MediaStreamAudioDestinationNode(${this._parameters.join(", ")});`;
  }
}

export {MediaStreamAudioDestinationNodeValue};

class MediaStreamAudioSourceNodeValue extends Value {
  private _type: string = "-media-stream-audio-source-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createMediaStreamAudioSourceNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = "new AudioContext({})";
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new MediaStreamAudioSourceNode(${this._parameters.join(", ")});`;
  }
}

export {MediaStreamAudioSourceNodeValue};

class MediaStreamTrackAudioSourceNodeValue extends Value {
  private _type: string = "-media-stream-track-audio-source-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createMediaStreamTrackAudioSourceNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = "new AudioContext({})";
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new MediaStreamTrackAudioSourceNode(${this._parameters.join(", ")});`;
  }
}

export {MediaStreamTrackAudioSourceNodeValue};

class OscillatorNodeValue extends Value {
  private _type: string = "-oscillator-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createOscillatorNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new OscillatorNode(${this._parameters.join(", ")});`;
  }
}

export {OscillatorNodeValue};

class PannerNodeValue extends Value {
  private _type: string = "-panner-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createPannerNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new PannerNode(${this._parameters.join(", ")});`;
  }
}

export {PannerNodeValue};

class PeriodicWaveValue extends Value {
  private _type: string = "-periodic-wave";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createPeriodicWaveId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new PeriodicWave(${this._parameters.join(", ")});`;
  }
}

export {PeriodicWaveValue};

class ScriptProcessorNodeValue extends Value {
  private _type: string = "-script-processor-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createScriptProcessorNodeId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new ScriptProcessorNode();`;
  }
}

export {ScriptProcessorNodeValue};

class StereoPannerNodeValue extends Value {
  private _type: string = "-stereo-panner-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createStereoPannerNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new StereoPannerNode(${this._parameters.join(", ")});`;
  }
}

export {StereoPannerNodeValue};

class WaveShaperNodeValue extends Value {
  private _type: string = "-wave-shaper-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createWaveShaperNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        this._parameters = [arg0, arg1];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new WaveShaperNode(${this._parameters.join(", ")});`;
  }
}

export {WaveShaperNodeValue};

class AudioWorkletValue extends Value {
  private _type: string = "-audio-worklet";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioWorkletId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioWorklet();`;
  }
}

export {AudioWorkletValue};

class AudioWorkletGlobalScopeValue extends Value {
  private _type: string = "-audio-worklet-global-scope";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioWorkletGlobalScopeId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioWorkletGlobalScope();`;
  }
}

export {AudioWorkletGlobalScopeValue};

class AudioParamMapValue extends Value {
  private _type: string = "-audio-param-map";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioParamMapId();
    this._parameters = [];
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioParamMap();`;
  }
}

export {AudioParamMapValue};

class AudioWorkletNodeValue extends Value {
  private _type: string = "-audio-worklet-node";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioWorkletNodeId();
    const constructorIndex = Math.floor(Math.random() * 1);
    let arg0, arg1, arg2;
    switch (constructorIndex) {
      case 0:
        arg0 = 123;
        arg1 = 123;
        arg2 = 123;
        this._parameters = [arg0, arg1, arg2];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioWorkletNode(${this._parameters.join(", ")});`;
  }
}

export {AudioWorkletNodeValue};

class AudioWorkletProcessorValue extends Value {
  private _type: string = "-audio-worklet-processor";
  private _id: number;
  private _parameters: any[];

  generate(ctx: GlobalContext): void {
    this._id = ctx.createAudioWorkletProcessorId();
    const constructorIndex = Math.floor(Math.random() * 1);
    switch (constructorIndex) {
      case 0:
        this._parameters = [];
        break;
    }
  }

  mutate(ctx: GlobalContext): void {
    this.generate(ctx);
  }

  lower(): string {
    return `const ${this._id} = new AudioWorkletProcessor(${this._parameters.join(", ")});`;
  }
}

export {AudioWorkletProcessorValue};

