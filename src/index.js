const EVENT_TYPES = Symbol('eventTypes');

const validateEventType = (
  emitterInstance,
  eventType = '',
) => {
  const eventTypes = emitterInstance[EVENT_TYPES];
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
