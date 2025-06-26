import React from 'react'
import { getColor } from './Color';

interface Appointment {
    id: string;
    candidate: string;
    date: Date;
    starttime: Date;
    endtime: Date;
    status: 'AVAILABLE' | 'BOOKED' | 'PROCESSING' | 'CANCEL' | 'COMPLETED';
}

interface TimeCardProps {
    appointments: Appointment[];
}

const TimeCard: React.FC<TimeCardProps> = ({ appointments }) => {
    return (
        <>
            {
                appointments.slice(0, 2).map((appointment) => (
                    <div
                        key={appointment.id}
                        className={`text-xs p-1 rounded text-white truncate ${getColor(appointment.id).color}`}
                    >
                        {appointment.starttime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })} - {appointment.endtime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </div>
                ))
            }
            {
                appointments.length > 2 && (
                    <div className="text-xs text-gray-500 font-medium">
                        +{appointments.length - 2} more
                    </div>
                )
            }
        </>
    )
}

export default TimeCard