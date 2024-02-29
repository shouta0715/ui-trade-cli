import React, { useMemo } from "react";
import {
  WebSocketContext,
  useFileSubscriptionProvider,
} from "@/client/features/subscription/useSubscription";

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshTime } = useFileSubscriptionProvider();

  const value = useMemo(() => ({ refreshTime }), [refreshTime]);

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
