import React from 'react'
import {
    AiOutlineCalendar,
    AiOutlineClockCircle,
    AiOutlineMail,
} from 'react-icons/ai';
import { getColor } from './Color';
import type { Booking } from '../../../public/consultant/interface/interface';
import { parseAvailableDay, parseAvailableTime } from '../Schedule';

interface Status {
    [key: string]: string;
}

interface UpcomingCardProps {
    appointments: Booking[];
    status: Status;
}

const UpcomingCard: React.FC<UpcomingCardProps> = ({ appointments, status }) => {

    return (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments
                        .filter(appointment => parseAvailableDay(appointment.availableDate) >= new Date() && appointment.status !== 'CANCELED' && appointment.status !== 'COMPLETED' && appointment.status !== 'ABSENT')
                        .sort((a, b) => parseAvailableTime(a.availableDate).getTime() - parseAvailableTime(b.availableDate).getTime())
                        .slice(0, 6)
                        .map((appointment) => (
                            <div
                                key={appointment.uuid}
                                className={`p-4 rounded-lg border-l-4 border-l-current hover:shadow-md transition-shadow duration-200 
                                    ${getColor(appointment.uuid).bgLight} 
                                    ${getColor(appointment.uuid).color}`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className={`font-semibold ${getColor(appointment.uuid).textColor}`}>
                                        {appointment.candidateUuid}
                                    </h4>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${status[appointment.status]}`}>
                                        {appointment.status}
                                    </span>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <AiOutlineCalendar size={14} />
                                        <span>{parseAvailableTime(appointment.availableDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <AiOutlineClockCircle size={14} />
                                        <span>{parseAvailableTime(appointment.startTime).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <AiOutlineMail size={14} />
                                        <span className="truncate">{appointment.candidateUuid}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default UpcomingCard