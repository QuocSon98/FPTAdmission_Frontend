
import React, { useState, useMemo } from 'react';
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineCalendar,
    AiOutlineClockCircle,
    AiOutlineEdit,
    AiOutlineMail,
    AiOutlinePhone,
} from 'react-icons/ai';
import UpcomingCard from './component/UpcomingCard';
import TimeCard from './component/TimeCard';
import DetailCard from './component/DetailCard';

interface Appointment {
    id: string;
    candidate: string;
    date: Date;
    starttime: Date;
    endtime: Date;
    status: 'AVAILABLE' | 'BOOKED' | 'PROCESSING' | 'CANCEL' | 'COMPLETED';
}

const statusColors = {
    AVAILABLE: 'text-yellow-600 bg-yellow-100',
    BOOKED: 'text-blue-600 bg-blue-100',
    PROCESSING: 'text-gray-600 bg-gray-100',
    CANCEL: 'text-red-600 bg-red-100',
    COMPLETED: 'text-green-600 bg-green-100',
};

const sampleAppointments: Appointment[] = [
    {
        id: '1',
        candidate: '1',
        date: new Date(2025, 5, 15),
        starttime: new Date(2025, 5, 15, 9, 0),
        endtime: new Date(2025, 5, 15, 9, 30),
        status: 'AVAILABLE'
    },
    {
        id: '2',
        candidate: '2',
        date: new Date(2025, 5, 15),
        starttime: new Date(2025, 5, 15, 10, 0),
        endtime: new Date(2025, 5, 15, 10, 30),
        status: 'BOOKED'
    },
    {
        id: '3',
        candidate: '3',
        date: new Date(2025, 5, 16),
        starttime: new Date(2025, 5, 16, 11, 0),
        endtime: new Date(2025, 5, 16, 11, 30),
        status: 'PROCESSING'
    },
    {
        id: '4',
        candidate: '4',
        date: new Date(2025, 5, 17),
        starttime: new Date(2025, 5, 17, 14, 0),
        endtime: new Date(2025, 5, 17, 15, 30),
        status: 'CANCEL'
    },
    {
        id: '5',
        candidate: '5',
        date: new Date(2025, 5, 25),
        starttime: new Date(2025, 5, 25, 16, 0),
        endtime: new Date(2025, 5, 25, 16, 30),
        status: 'COMPLETED'
    }
];

const Schedule: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
    const [status, setStatus] = useState(statusColors);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const current = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    }, [currentDate]);

    const getAppointmentsForDate = (date: Date) => {
        return appointments.filter(appointment =>
            appointment.date.toDateString() === date.toDateString()
        );
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleEditAppointment = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
    };

    const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

    return (
        <div className={`transition-all duration-300 ease-in-out ml-64`}>
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
                            <p className="text-gray-600">Manage your appointments and meetings</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calendar */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => navigateMonth('prev')}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                        >
                                            <AiOutlineLeft size={20} className="text-gray-600" />
                                        </button>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                        </h2>
                                        <button
                                            onClick={() => navigateMonth('next')}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                        >
                                            <AiOutlineRight size={20} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Calendar Grid */}
                                <div className="p-6">
                                    {/* Day Headers */}
                                    <div className="grid grid-cols-7 gap-1 mb-4">
                                        {dayNames.map((day) => (
                                            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar Days */}
                                    <div className="grid grid-cols-7 gap-1">
                                        {calendarDays.map((date, index) => {
                                            const dayAppointments = getAppointmentsForDate(date);
                                            const isCurrentMonthDay = isCurrentMonth(date);
                                            const isTodayDate = isToday(date);
                                            const isSelected = selectedDate?.toDateString() === date.toDateString();

                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => handleDateClick(date)}
                                                    className={`min-h-[100px] p-2 border border-gray-100 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${!isCurrentMonthDay ? 'opacity-40' : ''
                                                        } ${isTodayDate ? 'bg-blue-50 border-blue-200' : 'bg-white'
                                                        } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                                        }`}
                                                >
                                                    <div className={`text-sm font-medium mb-2 ${isTodayDate ? 'text-blue-600' : 'text-gray-900'
                                                        }`}>
                                                        {date.getDate()}
                                                    </div>

                                                    <div className="space-y-1">
                                                        <TimeCard appointments={dayAppointments}/>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Selected Day Details */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {selectedDate ? (
                                            <>
                                                {selectedDate.toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </>
                                        ) : (
                                            'Select a Date'
                                        )}
                                    </h3>
                                    {selectedDate && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>

                                <div className="p-6">
                                    <DetailCard selectedDate={selectedDate} selectedDateAppointments={selectedDateAppointments} statusColors={statusColors}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <UpcomingCard appointments={appointments} status={statusColors}/>
                </div>
            </div>
        </div>
    );
}

export default Schedule;