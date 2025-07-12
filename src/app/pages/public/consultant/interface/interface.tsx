export interface SchedulerFilter {
    userName: string,
    fullName: string,
    phone: string,
    email: string,
    address: string,
    image: string,
    staffUuid: string,
    scheduler: ChildSchedulerFilter,
    bookAt: Date,
    startTime: Date,
    endTime: Date,
    status: 'AVAILABLE' | 'BOOKED' | 'PROCESSING' | 'CANCEL' | 'COMPLETED',
    availableDate: Date,
    candidateUuid: string,
    bookingUuid: string
}

export interface ChildSchedulerFilter {
    uuid: string,
    weekOfYear: number,
    month: number,
    year: number,
    start_date: Date,
    end_date: Date
}

export interface Scheduler {
    uuid: string,
    bookingList: Booking[]
}

export interface Booking {
    uuid: string,
    candidateUuid: string,
    staffUuid: string,
    createdAt: Date,
    status: 'AVAILABLE' | 'BOOKED' | 'PROCESSING' | 'CANCEL' | 'COMPLETED',
    availableDate: string,
    startTime: string,
    endTime: string
}

export interface Process {
    id: string;
    status: 'completed' | 'current' | 'upcoming';
    title?: string;
}

export interface ProcessPage {
    formData: Form;
    updateFormData: (data: any) => void;
    onNext?: () => void;
    onPrevious?: () => void;
    onSubmit?: () => void;
}

export interface Form {
    fullname: string;
    email: string;
    phone: string;
    province: string;
    address: string;
    campusUuid: string;
    specializationUuid: string;
    scholarshipUuid: string;
    bookingUuid: string;

    consultationTime?: string;
    consultationDate?: string;
    campusName?: string;
    specializationName?: string;
    scholarshipName?: string;
}

export interface Specialization {
    name: string,
    description: string,
    major: Major,
    specializationId: string
}

export interface Major {
    id: string,
    name: string,
    description: string
}

export interface Campus {
    id: string,
    name: string,
    address: string,
    description: string
}

export interface Scholarship {
    id: string;
    name: string;
    description: string;
}
