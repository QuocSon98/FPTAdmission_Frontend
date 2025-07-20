export interface ApplicationReportResponse{
    totalApplication: number;
    approveCount: number;
    rejectCount: number;
}

export interface BookingReportResponse {
    completedCount: number;
    canceledCount: number;
}

export interface UserReportResponse {
    newUser: number;
}
