import React, { useEffect, useState } from 'react';
// import { processesList } from '../data/mockData';
// import type { Form, Process } from '../types';
import ProcessBar from '../../../components/processbar/ProcessBar';
import type { Form, Process } from './interface/interface';
import { processesList } from './data/data';
import PersonalInformation from './form/PersonalInformation';
import ConsultationInformation from './form/ConsultantInformation';
import BookingInformation from './form/BookingInformation';
import ConfirmationStep from './form/Confirmation';

const Consultant: React.FC = () => {
    const [formData, setFormData] = useState<Form>({
        fullName: '',
        email: '',
        phone: '',
        province: '',
        address: '',
        campusUuid: '',
        specializationUuid: '',
        scholarshipUuid: '',
        schedularUuid: ''
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [processes, setProcesses] = useState<Process[]>(processesList);

    const checkLogin = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // For demo purposes, we'll comment this out
            // window.location.href = '/login';
            console.log('No token found, but continuing for demo');
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    const updateFormData = (newData: Partial<Form>) => {
        setFormData(prev => ({ ...prev, ...newData }));
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
        setProcesses(updatedProcesses);
    };

    const handleNext = () => {
        if (currentStep < processes.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            updateProcessStates(nextStep);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            updateProcessStates(prevStep);
        }
    };

    const handleStepClick = (stepId: string) => {
        const stepIndex = processes.findIndex(p => p.id === stepId);
        if (stepIndex !== -1 && stepIndex <= currentStep) {
            setCurrentStep(stepIndex);
            updateProcessStates(stepIndex);
        }
    };

    const handleSubmit = async () => {
        try {
            // Here you would normally submit to your API
            console.log('Submitting form data:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
            
            // Reset form or redirect
            // window.location.href = '/success';
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <PersonalInformation
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={handleNext}
                    />
                );
            case 1:
                return (
                    <ConsultationInformation
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 2:
                return (
                    <BookingInformation
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 3:
                return (
                    <ConfirmationStep
                        formData={formData}
                        updateFormData={updateFormData}
                        onPrevious={handlePrevious}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Đăng ký tư vấn</h1>
                    <p className="text-lg text-gray-600">Hệ thống tư vấn tuyển sinh trực tuyến</p>
                </div>

                <ProcessBar 
                    processes={processes} 
                    onStepClick={handleStepClick}
                />

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {renderCurrentStep()}
                </div>
            </div>
        </div>
    );
};

export default Consultant;