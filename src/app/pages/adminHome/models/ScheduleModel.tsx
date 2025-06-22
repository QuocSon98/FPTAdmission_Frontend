export interface ScheduleItem {
  uuid: string
  bookingList: {
    uuid: string
    candidateUuid: string
    staffUuid: string
    createdAt: string
    status: "AVAILABLE" | "BOOKED" | "PROCESSING" | "CANCEL" | "COMPLETED" // bạn có thể mở rộng
    availableDate: string
    startTime: string
    endTime: string
  }[]
}

export interface Slot {
  date: string
  time: string
  assignedTo: string[]
  displayNames?: string[]
  statuses?: string[]
}
