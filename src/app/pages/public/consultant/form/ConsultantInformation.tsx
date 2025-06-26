import React, { useEffect, useState } from 'react';
import { FormInput2 } from '../data/data';
import type { ProcessPage } from '../interface/interface';
import { getApi } from '../data/getApi';

const ConsultantInformation: React.FC<ProcessPage> = ({ formData, updateFormData, onNext, onPrevious }) => {

    const [campusList, setCampusList] = useState([]);
    const [specializationList, setSpecializationList] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getApi('/campus').then(setCampusList).catch(error => {
            console.error("Error fetching campus data:", error);
        });

        getApi('/program').then(setSpecializationList).catch(error => {
            console.error("Error fetching specialization data:", error);
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        updateFormData({
            ...formData,
            [id]: value
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form data here if needed
        if (onNext) {
            onNext();
        }
    }

    return (
        <>
            <div className='text-[40px] text-center'>
                <h1>Đăng kí tư vấn</h1>
            </div>
            <form className='' onSubmit={handleSubmit}>
                {FormInput2.map(({ id, label, type }) => (
                    <div className='my-3'>
                        <label className='block text-[17px] font-bold my-2'>
                            {label}
                            <span className='text-red-700 mx-2'>*</span>
                        </label>
                        {type === 'select' ? <select
                            id='address'
                            required
                            // value={}
                            onChange={handleInputChange}
                            className='rounded-md border w-full block border-gray-300 h-10 my-2 px-2'>
                            {id === 'specializationUuid' ? specializationList.map(({ uuid, name }) => (
                                <option value={uuid} key={uuid}>
                                    {name}
                                </option>
                            )) : id === 'campusUuid' ?
                                campusList.map(({ value, label }) => (
                                    <option value={value}>
                                        {label}
                                    </option>
                                )) : null}
                        </select> :
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id={id}
                                    checked={formData.scholarshipUuid || false}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                                    {label}
                                </label>
                            </div>
                        }
                    </div>
                ))}
                <div className='flex justify-between pt-6'>
                    <button
                        type="button"
                        onClick={onPrevious}
                        className='rounded-md bg-[rgba(240_81_35)] text-white h-10 w-20 font-bold text-[17px] my-2' >
                        Quay lại
                    </button>
                    <button
                        type="submit"
                        // onClick={}
                        className='rounded-md bg-[rgba(240_81_35)] text-white h-10 w-20 font-bold text-[17px] my-2' >
                        {onNext ? 'Tiếp theo' : 'Gửi'}
                    </button>
                </div>
            </form>
        </>
    )

}

export default ConsultantInformation;