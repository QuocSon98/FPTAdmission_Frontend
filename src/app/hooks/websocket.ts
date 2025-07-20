// hooks/useWebSocket.ts
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function useWebSocket(onMessage: (message: any) => void, topic: string) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:9001/ws"); // ⚠️ sửa thành URL server bạn
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        client.subscribe(topic, (msg) => {
          const payload = JSON.parse(msg.body);
          onMessage(payload);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [topic]);
}
