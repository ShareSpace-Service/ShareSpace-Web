declare module 'event-source-polyfill' {
  interface EventSourceInitPolyfill extends EventSourceInit {
    headers?: Record<string, string>;
    heartbeatTimeout?: number;
    reconnectInterval?: number;
    withCredentials?: boolean;
  }

  export class EventSourcePolyfill extends EventSource {
    constructor(
      url: string,
      eventSourceInitDict?: EventSourceInitPolyfill
    );
  }
}