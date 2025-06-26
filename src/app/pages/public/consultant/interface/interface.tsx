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
    fullname: string | '',
    email: string | '', 
    phone: string | '',
    province: string | '',
    address: string | '',
    campusUuid: string | '',
    specializationUuid: string | '',
    scholarshipUuid: boolean | false,
    schedularUuid: string | ''
}