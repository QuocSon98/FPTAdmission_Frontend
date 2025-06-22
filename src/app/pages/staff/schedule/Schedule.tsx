
import React, { useState, useMemo } from 'react';
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineCalendar,
    AiOutlineClockCircle,
    AiOutlineEdit,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineLink,
} from 'react-icons/ai';

interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    link?: string;
    date: Date;
    time: string;
    duration: string;
    type: 'consultation' | 'meeting' | 'interview' | 'call';
    notes?: string;
    status: 'confirmed' | 'pending' | 'cancelled';
}

const appointmentTypes = {
    consultation: { color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50' },
    meeting: { color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' },
    interview: { color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-50' },
    call: { color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50' }
};

const statusColors = {
    confirmed: 'text-green-600 bg-green-100',
    pending: 'text-yellow-600 bg-yellow-100',
    cancelled: 'text-red-600 bg-red-100'
};

const sampleAppointments: Appointment[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        link: 'https://zoom.us/j/123456789',
        date: new Date(2025, 5, 15),
        time: '09:00',
        duration: '60 min',
        type: 'consultation',
        notes: 'Initial consultation for web development project',
        status: 'confirmed'
    },
    {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        phone: '+1 (555) 987-6543',
        date: new Date(2025, 5, 15),
        time: '14:30',
        duration: '45 min',
        type: 'meeting',
        notes: 'Project review and next steps discussion',
        status: 'confirmed'
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.r@startup.io',
        phone: '+1 (555) 456-7890',
        link: 'https://meet.google.com/abc-defg-hij',
        date: new Date(2025, 5, 16),
        time: '10:00',
        duration: '30 min',
        type: 'interview',
        notes: 'Technical interview for frontend developer position',
        status: 'pending'
    },
    {
        id: '4',
        name: 'David Wilson',
        email: 'david.wilson@corp.com',
        phone: '+1 (555) 321-0987',
        date: new Date(2025, 5, 17),
        time: '16:00',
        duration: '30 min',
        type: 'call',
        notes: 'Follow-up call regarding proposal',
        status: 'confirmed'
    },
    {
        id: '5',
        name: 'Lisa Thompson',
        email: 'lisa.thompson@agency.com',
        phone: '+1 (555) 654-3210',
        link: 'https://teams.microsoft.com/l/meetup-join/xyz',
        date: new Date(2025, 5, 25),
        time: '11:30',
        duration: '90 min',
        type: 'consultation',
        notes: 'Brand strategy consultation session',
        status: 'confirmed'
    }
];

const Schedule: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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
                                                        {dayAppointments.slice(0, 2).map((appointment) => (
                                                            <div
                                                                key={appointment.id}
                                                                className={`text-xs p-1 rounded text-white truncate ${appointmentTypes[appointment.type].color
                                                                    }`}
                                                            >
                                                                {appointment.time} - {appointment.name}
                                                            </div>
                                                        ))}
                                                        {dayAppointments.length > 2 && (
                                                            <div className="text-xs text-gray-500 font-medium">
                                                                +{dayAppointments.length - 2} more
                                                            </div>
                                                        )}
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
                                    {selectedDate ? (
                                        selectedDateAppointments.length > 0 ? (
                                            <div className="space-y-4">
                                                {selectedDateAppointments
                                                    .sort((a, b) => a.time.localeCompare(b.time))
                                                    .map((appointment) => (
                                                        <div
                                                            key={appointment.id}
                                                            className={`p-4 rounded-lg border-l-4 ${appointmentTypes[appointment.type].bgLight} ${appointmentTypes[appointment.type].color} border-l-current`}
                                                        >
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex-1">
                                                                    <h4 className={`font-semibold ${appointmentTypes[appointment.type].textColor}`}>
                                                                        {appointment.name}
                                                                    </h4>
                                                                    <div className="flex items-center space-x-2 mt-1">
                                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[appointment.status]}`}>
                                                                            {appointment.status}
                                                                        </span>
                                                                        <span className="text-xs text-gray-500 capitalize">
                                                                            {appointment.type}
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
                                                                    <span>{appointment.time} ({appointment.duration})</span>
                                                                </div>

                                                                <div className="flex items-center space-x-2 text-gray-600">
                                                                    <AiOutlineMail size={16} />
                                                                    <a
                                                                        href={`mailto:${appointment.email}`}
                                                                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                                    >
                                                                        {appointment.email}
                                                                    </a>
                                                                </div>

                                                                <div className="flex items-center space-x-2 text-gray-600">
                                                                    <AiOutlinePhone size={16} />
                                                                    <a
                                                                        href={`tel:${appointment.phone}`}
                                                                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                                    >
                                                                        {appointment.phone}
                                                                    </a>
                                                                </div>

                                                                {appointment.link && (
                                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                                        <AiOutlineLink size={16} />
                                                                        <a
                                                                            href={appointment.link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate"
                                                                        >
                                                                            Join Meeting
                                                                        </a>
                                                                    </div>
                                                                )}

                                                                {appointment.notes && (
                                                                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                                                                        {appointment.notes}
                                                                    </div>
                                                                )}
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {appointments
                                    .filter(appointment => appointment.date >= new Date() && appointment.status !== 'cancelled')
                                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                                    .slice(0, 6)
                                    .map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className={`p-4 rounded-lg border-l-4 ${appointmentTypes[appointment.type].bgLight} ${appointmentTypes[appointment.type].color} border-l-current hover:shadow-md transition-shadow duration-200`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className={`font-semibold ${appointmentTypes[appointment.type].textColor}`}>
                                                    {appointment.name}
                                                </h4>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[appointment.status]}`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <div className="flex items-center space-x-2">
                                                    <AiOutlineCalendar size={14} />
                                                    <span>{appointment.date.toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <AiOutlineClockCircle size={14} />
                                                    <span>{appointment.time}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <AiOutlineMail size={14} />
                                                    <span className="truncate">{appointment.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Schedule;