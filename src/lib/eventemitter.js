import { getUid } from './id';

class EventEmitter {
  listeners = [];

  addListener(eventName: string, fn: () => void):number {
    const listener = {
      eventName,
      fn,
    };
    const uid = getUid(listener);
    this.listeners.push(listener);
    return uid;
  }

  removeListener(uid: number) {
    this.listeners = this.listeners.filter(listener => getUid(listener) !== uid);
  }

  emit(eventName: string) {
    this.listeners.filter(listener => listener.eventName === eventName)
        .forEach(listener => listener.fn());
  }
}

export default EventEmitter;