import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import type { Account } from "../../adminHome/models/UserModel";
import { X } from "lucide-react";

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
    const [visibleEvent, setVisibleEvent] = useState<BaseEvent | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [lastBookingUuid, setLastBookingUuid] = useState<string | null>(null);

    const account: Account = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")!) : null;

    useEffect(() => {
        const stompClient = Stomp.over(() => new SockJS("http://localhost:9001/ws"));

        stompClient.connect({}, () => {
            stompClient.subscribe(
                `/topic/new-application/${account?.uuid}`,
                (message) => {
                    const data = JSON.parse(message.body) as SocketNewApplicationEvent;
                    console.log("Received event:", data);
<<<<<<< Updated upstream
                    // Hiện thông tin event mới nhất trong 5 giây
                    setVisibleEvent({
                        name: data.submitApplicationEvent.fullname,
                        consultantUuid: data.consultantUuid,
                        description: `Specialization: ${data.submitApplicationEvent.specialization} | Campus: ${data.submitApplicationEvent.campus}`,
                    });
                    setIsVisible(true);
                    setTimeout(() => {
                        setIsVisible(false);
                        setTimeout(() => setVisibleEvent(null), 300);
                    }, 5000);
=======
                    // Chỉ hiện popup nếu bookingUuid mới
                    if (data.bookingUuid !== lastBookingUuid) {
                        setEvents((prev) => [
                            {
                                name: data.submitApplicationEvent.fullname,
                                consultantUuid: data.consultantUuid,
                                description: `Specialization: ${data.submitApplicationEvent.specialization} | Campus: ${data.submitApplicationEvent.campus}`,
                            },
                            ...prev,
                        ]);
                        setLastBookingUuid(data.bookingUuid);
                    }
>>>>>>> Stashed changes
                }
            );
        });

        return () => {
            if (stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, [account?.uuid, lastBookingUuid]);

    // useEffect tự động hiện event đã bỏ, xử lý trực tiếp khi nhận event mới

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setVisibleEvent(null), 300);
    };

<<<<<<< Updated upstream
    // Don't render if no visible event
=======
>>>>>>> Stashed changes
    if (!visibleEvent) return null;

    return (
        visibleEvent && (
            <div className={`fixed bottom-5 right-5 z-50 max-w-sm transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border-2 border-orange-500">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-900 font-medium">
                                    <span className="font-semibold">{visibleEvent.name}</span> have scheduled a consultation with you
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{visibleEvent.description}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        )
    );
}