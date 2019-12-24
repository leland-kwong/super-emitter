const EventEmitter = require('events');
const SE = require('./index');

const run = (fn) => fn();
const noop = () => {};

describe('event validation', () => {
  const emitter = new EventEmitter();
  const eventType = 'foo';

  SE.registerEventTypes(emitter, [
    eventType,
  ]);

  test('can emit and listen to registered event', async () => {
    const fn = jest.fn();
    SE.on(emitter, eventType, fn);
    SE.emit(emitter, eventType, 'foobar');
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe('foobar');
  });

  test('removes listener', () => {
    const fn = jest.fn();
    SE.on(emitter, eventType, fn);
    SE.off(emitter, eventType, fn);
    SE.emit(emitter, eventType, 'foobar');
    expect(fn.mock.calls.length).toBe(0);
  });

  test('throw when emitting unregistered event', () => {
    expect(run(() => {
      const unregisteredEventType = `${eventType}-bar`;

      try {
        SE.emit(emitter, unregisteredEventType, {});
      } catch (err) {
        return 'error';
      }
      return null;
    })).toBe('error');
  });

  test('throw when listening to unregistered event', () => {
    expect(run(() => {
      const unregisteredEventType = `${eventType}-bar`;

      try {
        SE.on(emitter, unregisteredEventType, noop);
      } catch (err) {
        return 'error';
      }
      return null;
    })).toBe('error');
  });
});
