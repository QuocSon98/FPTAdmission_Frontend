import React from 'react'
import { getColor } from './Color';
import type { Booking } from '../../../public/consultant/interface/interface';
import { parseAvailableTime } from '../Schedule';


const TimeCard: React.FC<{ bookingList: Booking[] }> = ({ bookingList }) => {
    return (
        <>
            {
                bookingList.slice(0, 2).map((booking) => (
                    <div
                        key={booking.uuid}
                        className={`text-xs p-1 rounded text-white truncate ${getColor(booking.uuid).color}`}
                    >
                        {parseAvailableTime(booking.startTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })} - 
                        {parseAvailableTime(booking.endTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </div>
                ))
            }
            {
                bookingList.length > 2 && (
                    <div className="text-xs text-gray-500 font-medium">
                        +{bookingList.length - 2} more
                    </div>
                )
            }
        </>
    )
}

export default TimeCard