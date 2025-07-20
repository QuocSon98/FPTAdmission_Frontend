import React, { useEffect, useState } from 'react'
import {
    AiOutlineCalendar,
    AiOutlineClockCircle,
    AiOutlineEdit,
    AiOutlineMail,
    AiOutlinePhone,
} from 'react-icons/ai';
import { getColor } from './Color';
import type { Booking } from '../../../public/consultant/interface/interface';
import { parseAvailableTime } from '../Schedule';
import { getApi, sendData } from '../../../public/consultant/data/getApi';
import { InfoIcon, User, X } from 'lucide-react';
import type { AccountResponse } from '../../../authentication/models/loginModel';

interface StatusColors {
    [key: string]: string;
}

interface DetailCardProps {
    selectedDate: Date | null;
    selectedDateAppointments: Booking[];
    statusColors: StatusColors;

}

const DetailCard: React.FC<DetailCardProps> = ({ selectedDate, selectedDateAppointments, statusColors }) => {

    const [openEditId, setOpenEditId] = useState<string | null>(null);
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const [selectedCandidateBooking, setSelectedCandidateBooking] = useState<string | null>(null);
    const [candidateInfo, setCandidateInfo] = useState<AccountResponse | undefined>(undefined);

    const handleEditAppointment = async (appointment: Booking, status: string) => {
        const updatedFormData = {
            status: status
        };

        try {
            await sendData(`/booking/status/${appointment.uuid}`, 'PUT', updatedFormData);
            console.log('Appointment updated successfully');

            // Close the edit dropdown
            setOpenEditId(null);

            // Optionally trigger a refresh of appointments
            // You might need to call a parent function to refresh the data

        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const getCandidateInfo = async () => {
        if (!selectedCandidateBooking) return;

        try {
            await getApi<AccountResponse>(`/users/${selectedCandidateBooking}`)
                .then(response => {
                    setCandidateInfo(response);
                })
        } catch (error) {
            console.error('Error fetching candidate info:', error);
        }
    };

    useEffect(() => {
        getCandidateInfo();
    }, [selectedCandidateBooking]);

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
                            .sort((a, b) => parseAvailableTime(a.startTime).getTime() - parseAvailableTime(b.startTime).getTime())
                            .map((appointment) => (
                                <div
                                    key={appointment.uuid}
                                    className={`p-4 rounded-lg border-l-4 border-l-current ${getColor(appointment.uuid).color} ${getColor(appointment.uuid).bgLight}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[appointment.status]}`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative flex items-center space-x-1 ml-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedCandidateBooking(appointment.candidateUuid);
                                                    setIsOpenInfo(!isOpenInfo);
                                                }}
                                                className={`p-1 text-black hover:text-gray-500 hover:bg-white rounded transition-colors duration-200`}
                                            >
                                                <InfoIcon size={14} />
                                            </button>
                                            {isOpenInfo && selectedCandidateBooking === appointment.uuid && (
                                                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                                                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h3 className="text-lg font-semibold text-gray-800">Candidate Information</h3>
                                                            <button
                                                                onClick={() => {
                                                                    setIsOpenInfo(false);
                                                                    setSelectedCandidateBooking(null);
                                                                }}
                                                                className="text-gray-400 hover:text-gray-600"
                                                            >
                                                                <X size={20} />
                                                            </button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="flex items-center space-x-2">
                                                                <User size={16} className="text-gray-500" />
                                                                <span className="text-sm text-gray-700">{candidateInfo?.fullName || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <AiOutlineMail size={16} className="text-gray-500" />
                                                                <span className="text-sm text-gray-700">{candidateInfo?.email || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <AiOutlinePhone size={16} className="text-gray-500" />
                                                                <span className="text-sm text-gray-700">{candidateInfo?.phone || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <AiOutlineCalendar size={16} className="text-gray-500" />
                                                                <span className="text-sm text-gray-700">
                                                                    {parseAvailableTime(appointment.startTime).toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    })} -
                                                                    {parseAvailableTime(appointment.endTime).toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setOpenEditId(openEditId === appointment.uuid ? null : appointment.uuid);
                                                }}
                                                disabled={appointment.status !== 'PROCESSING'}
                                                className={`p-1 text-black hover:text-gray-500 hover:bg-white rounded transition-colors duration-200 ${appointment.status !== 'PROCESSING' ? 'hidden' : ''}`}
                                            >
                                                <AiOutlineEdit size={14} />
                                            </button>
                                            {openEditId === appointment.uuid && (
                                                <div className="absolute top-full right-0 mt-1 rounded-md 
                                            bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden z-10">
                                                    <div role="none" className="p-1">
                                                        <button
                                                            onClick={() => handleEditAppointment(appointment, 'COMPLETED')}
                                                            className="block px-4 py-2 text-sm text-white bg-green-300 w-full rounded-md hover:bg-green-400">
                                                            Completed
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditAppointment(appointment, 'CANCELED')}
                                                            className="block px-4 py-2 text-sm my-1 text-white bg-red-300 w-full rounded-md hover:bg-red-400">
                                                            Canceled
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditAppointment(appointment, 'ABSENT')}
                                                            className="block px-4 py-2 text-sm text-white bg-yellow-300 w-full rounded-md hover:bg-yellow-400">
                                                            Absent
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className={`flex items-center space-x-2 text-black`}>
                                            <AiOutlineClockCircle size={16} />
                                            <span>{parseAvailableTime(appointment.startTime).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })} ({getDuration(parseAvailableTime(appointment.startTime), parseAvailableTime(appointment.endTime))})</span>
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