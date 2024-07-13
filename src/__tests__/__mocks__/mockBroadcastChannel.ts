import { EventEmitter } from 'node:events';

const channels: Map<string, EventEmitter> = new Map();

export class MockBroadcastChannel {
  private emitter: EventEmitter;

  constructor(public name: string) {
    if (channels.has(name)) {
      this.emitter = channels.get(name) as EventEmitter;
    } else {
      const emitter = new EventEmitter();
      channels.set(name, emitter);
      this.emitter = emitter;
    }
  }

  public prototype = BroadcastChannel;

  public onmessage = jest.fn();

  public onmessageerror = jest.fn();

  public removeEventListener = jest.fn();

  public dispatchEvent = jest.fn();

  public postMessage = jest.fn().mockImplementation((message: MessageEvent) => {
    const event = { data: message };
    this.emitter.emit('message', event);
  });

  public addEventListener = jest.fn().mockImplementation((_: string, listener: () => void) => {
    this.emitter.on('message', listener);
  });

  public close = jest.fn().mockImplementation(() => {
    this.emitter.removeAllListeners();
    channels.delete(this.name);
  });
}

global.BroadcastChannel = MockBroadcastChannel;
