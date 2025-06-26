import React, { useEffect, useState } from 'react'
import ProcessBar from '../../../components/processbar/ProcessBar'
import { processesList } from './data/data'
import ConsultantInformation from './form/ConsultantInformation'
import type { Form } from './interface/interface'

const Consultant: React.FC = () => {

    const [formData, setFormData] = useState<Form>({
        fullname: '',
        email: '',
        phone: '',
        province: '',
        address: '',
        campusUuid: '',
        specializationUuid: '',
        scholarshipUuid: false,
        schedularUuid: ''
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [processes, setProcessStates] = useState(processesList);

    const BASE_URL = 'http://localhost:8080/api';


    const checkLogin = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    const updateFormData = (newData: Form) => {
        const updatedData = { ...formData, ...newData };
        setFormData(updatedData);
    };

    const updateProcessStates = (step: number) => {
        const updatedProcesses = processes.map((process, index) => {
            if (index < step) {
                return { ...process, status: 'completed' as const };
            } else if (index === step) {
                return { ...process, status: 'current' as const };
            } else {
                return { ...process, status: 'upcoming' as const };
            }
        });
        setProcessStates(updatedProcesses);
    };

    return (
        <div className='mx-60 my-10'>
            <div className='flex justify-center'>
                <ProcessBar processes={processesList} />
            </div>

            <div className=''>
                <ConsultantInformation formData={formData} updateFormData={updateFormData} />
            </div>
        </div>
    )
}

export default Consultant