// hooks/useMultiWebSocket.ts
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Subscription {
  topic: string;
  handler: (message: any) => void;
}

export function useMultiWebSocket(subscriptions: Subscription[]) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:9001/ws"); // ⚠️ sửa URL production nếu cần
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        subscriptions.forEach(({ topic, handler }) => {
          client.subscribe(topic, (msg) => {
            try {
              const payload = JSON.parse(msg.body);
              handler(payload);
            } catch (err) {
              console.error("❌ JSON parse error", err);
            }
          });
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);
}
