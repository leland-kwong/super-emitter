const EVENT_TYPES = '__eventTypes__';

const validateEventType = (
  emitterInstance,
  eventType = '',
) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const eventTypes = emitterInstance[EVENT_TYPES];

  if (!eventTypes) {
    const msg = [
      '[ super-emitter ] emitter instance',
      'has no registered types',
    ].join(' ');
    throw new Error(msg);
  }

  if (eventTypes.has(eventType)) {
    return;
  }

  throw new Error(
    `eventType \`${eventType}\` has not been registered`,
  );
};

module.exports = {
  registerEventTypes(
    emitterInstance,
    eventTypes = [],
  ) {
    const instance = emitterInstance;
    instance[EVENT_TYPES] = new Set(eventTypes);
    return emitterInstance;
  },

  on(emitterInstance, eventType, handler) {
    validateEventType(emitterInstance, eventType);
    emitterInstance.on(eventType, handler);
    return emitterInstance;
  },

  off(emitterInstance, eventType, handler) {
    validateEventType(emitterInstance, eventType);
    emitterInstance.off(eventType, handler);
    return emitterInstance;
  },

  emit(emitterInstance, eventType, data) {
    validateEventType(emitterInstance, eventType);
    emitterInstance.emit(eventType, data);
    return emitterInstance;
  },
};
