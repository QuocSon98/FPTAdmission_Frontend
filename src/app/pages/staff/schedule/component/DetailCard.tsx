import React, { useState } from 'react'
import {
    AiOutlineCalendar,
    AiOutlineClockCircle,
    AiOutlineEdit,
    AiOutlineMail,
    AiOutlinePhone,
} from 'react-icons/ai';
import { getColor } from './Color';

interface Appointment {
    id: string;
    candidate: string;
    date: Date;
    starttime: Date;
    endtime: Date;
    status: 'AVAILABLE' | 'BOOKED' | 'PROCESSING' | 'CANCEL' | 'COMPLETED';
}

interface StatusColors {
    [key: string]: string;
}

interface DetailCardProps {
    selectedDate: Date | null;
    selectedDateAppointments: Appointment[];
    statusColors: StatusColors;

}

const DetailCard: React.FC<DetailCardProps> = ({ selectedDate, selectedDateAppointments, statusColors }) => {
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);


    const handleEditAppointment = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
    };

    const getDuration = (start: Date, end: Date) => {
        const diff = end.getTime() - start.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }

    return (
        <>
            {selectedDate ? (
                selectedDateAppointments.length > 0 ? (
                    <div className="space-y-4">
                        {selectedDateAppointments
                            .sort((a, b) => a.starttime.getTime() - b.starttime.getTime())
                            .map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className={`p-4 rounded-lg border-l-4 border-l-current ${getColor(appointment.id).color} ${getColor(appointment.id).bgLight}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h4 className={`font-semibold ${getColor(appointment.id).textColor}`}>
                                                {appointment.candidate}
                                            </h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[appointment.status]}`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1 ml-2">
                                            <button
                                                onClick={() => handleEditAppointment(appointment)}
                                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                                            >
                                                <AiOutlineEdit size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <AiOutlineClockCircle size={16} />
                                            <span>{appointment.starttime.toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })} ({getDuration(appointment.starttime, appointment.endtime)})</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <AiOutlineMail size={16} />
                                            <a
                                                href={`mailto:${appointment.candidate}`}
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                            >
                                                {appointment.candidate}
                                            </a>
                                        </div>

                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <AiOutlinePhone size={16} />
                                            <a
                                                href={`tel:${appointment.candidate}`}
                                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                            >
                                                {appointment.candidate}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <AiOutlineCalendar size={48} className="text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No appointments scheduled</p>
                    </div>
                )
            ) : (
                <div className="text-center py-8">
                    <AiOutlineCalendar size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Click on a date to view appointments</p>
                </div>
            )}
        </>
    )
}

export default DetailCard;