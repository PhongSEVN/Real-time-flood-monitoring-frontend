export type SocketMessage<TPayload = unknown> = {
  type: string;
  payload?: TPayload;
};

type Unsubscribe = () => void;

type Listener = (payload: unknown, raw: SocketMessage) => void;

/**
 * Minimal WebSocket wrapper (no dependency) with:
 * - auto reconnect
 * - typed message envelope: { type, payload }
 * - simple pub/sub by message.type
 *
 * Backend should send JSON messages in this format.
 */
class RealtimeSocket {
  private ws: WebSocket | null = null;
  private url: string | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempt = 0;
  private listeners = new Map<string, Set<Listener>>();
  private openListeners = new Set<() => void>();
  private closeListeners = new Set<() => void>();
  private errorListeners = new Set<(err: Event) => void>();

  connect(url: string) {
    this.url = url;
    this.cleanup();
    this.open(url);
  }

  disconnect() {
    this.cleanup();
    this.url = null;
  }

  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  send<TPayload = unknown>(type: string, payload?: TPayload) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const msg: SocketMessage<TPayload> = { type, payload };
    this.ws.send(JSON.stringify(msg));
  }

  on(type: string, cb: (payload: unknown, raw: SocketMessage) => void): Unsubscribe {
    const set = this.listeners.get(type) ?? new Set<Listener>();
    set.add(cb);
    this.listeners.set(type, set);
    return () => set.delete(cb);
  }

  onOpen(cb: () => void): Unsubscribe {
    this.openListeners.add(cb);
    return () => this.openListeners.delete(cb);
  }

  onClose(cb: () => void): Unsubscribe {
    this.closeListeners.add(cb);
    return () => this.closeListeners.delete(cb);
  }

  onError(cb: (err: Event) => void): Unsubscribe {
    this.errorListeners.add(cb);
    return () => this.errorListeners.delete(cb);
  }

  private open(url: string) {
    try {
      const ws = new WebSocket(url);
      this.ws = ws;

      ws.onopen = () => {
        this.reconnectAttempt = 0;
        this.openListeners.forEach((fn) => fn());
      };

      ws.onclose = () => {
        this.closeListeners.forEach((fn) => fn());
        this.scheduleReconnect();
      };

      ws.onerror = (err) => {
        this.errorListeners.forEach((fn) => fn(err));
      };

      ws.onmessage = (evt) => {
        const raw = this.safeParse(evt.data);
        if (!raw) return;
        const set = this.listeners.get(raw.type);
        if (!set || set.size === 0) return;
        set.forEach((fn) => fn(raw.payload, raw));
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (!this.url) return;
    if (this.reconnectTimer) return;
    const attempt = Math.min(this.reconnectAttempt + 1, 6);
    this.reconnectAttempt = attempt;
    const delay = Math.min(1000 * 2 ** attempt, 15000); // 2s..15s
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.url) return;
      this.open(this.url);
    }, delay);
  }

  private cleanup() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      try {
        this.ws.onopen = null;
        this.ws.onclose = null;
        this.ws.onerror = null;
        this.ws.onmessage = null;
        this.ws.close();
      } catch {
        // ignore
      }
      this.ws = null;
    }
  }

  private safeParse(data: unknown): SocketMessage | null {
    if (typeof data !== "string") return null;
    try {
      const parsed = JSON.parse(data) as SocketMessage;
      if (!parsed || typeof parsed.type !== "string") return null;
      return parsed;
    } catch {
      return null;
    }
  }
}

export const realtimeSocket = new RealtimeSocket();




