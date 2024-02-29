/* eslint-disable no-console */

import { createContext, useContext, useEffect, useRef, useState } from "react";

export const WebSocketContext = createContext<{ refreshTime: number }>({
  refreshTime: 0,
});

export function useFileSubscriptionProvider() {
  const [refreshTime, setRefreshTime] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const pt = window.location.protocol === "https:" ? "wss" : "ws";

    if (wsRef.current === null) {
      console.log("🚀 Create WebSocket", `${pt}://${window.location.host}`);
      wsRef.current = new WebSocket(`${pt}://${window.location.host}`);
    }

    const ws = wsRef.current;

    ws.onopen = () => console.log("🚀 Start File Wacher");

    ws.onmessage = () => setRefreshTime(new Date().getTime());

    return () => {
      ws.close();

      wsRef.current = null;
    };
  }, []);

  return { refreshTime };
}

export function useWatchFile(callback: () => void) {
  const { refreshTime } = useContext(WebSocketContext);

  useEffect(() => {
    if (refreshTime !== 0) callback();
  }, [callback, refreshTime]);
}
