import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

interface SubmitApplicationEvent {
  email: string;
  phone: string;
  fullname: string;
  specialization: string;
  campus: string;
}

interface SocketNewApplicationEvent {
  bookingUuid: string;
  consultantUuid: string;
  submitApplicationEvent: SubmitApplicationEvent;
}

interface BaseEvent {
  name: string;
  consultantUuid: string;
  description: string;
}

export default function NotiPopup() {
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [status, setStatus] = useState<string>("Disconnected");

  useEffect(() => {
    const stompClient = Stomp.over(() => new SockJS("http://localhost:9001/ws"));

    stompClient.connect({}, () => {
      console.log("Connected!");
      setStatus("Connected!");

      stompClient.subscribe(
        "/topic/new-application/3ac00add-43b9-4699-bd7a-a987d90d0486",
        (message) => {
          const data = JSON.parse(message.body) as SocketNewApplicationEvent;
          console.log("Received event:", data);

          setEvents((prev) => [
            {
              name: data.submitApplicationEvent.fullname,
              consultantUuid: data.consultantUuid,
              description: `Specialization: ${data.submitApplicationEvent.specialization} | Campus: ${data.submitApplicationEvent.campus}`,
            },
            ...prev,
          ]);
        }
      );
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Websocket</h1>
      <h2>Status: {status}</h2>
      {events.map((event, index) => (
        <div key={index}>
          <h3>{event.name}</h3>
          <p>Consultant UUID: {event.consultantUuid}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}