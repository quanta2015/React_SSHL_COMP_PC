type EventCallback = (data: any) => void;

class EventEmitter {
  events: { [key: string]: Array<EventCallback> };

  constructor() {
    this.events = {};
  }

  dispatch(event: string, data?: any) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((callback) => callback(data));
  }

  subscribe(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }
}

export default EventEmitter;
