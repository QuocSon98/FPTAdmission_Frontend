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

export interface Specialization {
    name: string,
    description: string,
    major: {
        id: string,
        name: string,
        description: string
    },
    specializationId: string
}

export interface Campus   {
    id: string,
    name: string,
    address: string,
    description: string
  }
