import React, { use, useEffect, useState } from 'react';
import { FormInput1, ProvinceList } from '../data/data';
import type { Form, ProcessPage } from '../interface/interface';

const PersonalInformation: React.FC<ProcessPage> = ({ formData, updateFormData, onNext }) => {

    useEffect(() => {
        const accountData = localStorage.getItem('account');
        if (accountData) {
            const account = JSON.parse(accountData);
            updateFormData({
                ...formData,
                fullname: account.fullname,
                email: account.email,
                phone: account.phone,
                address: account.address
            });
        }
    }, []);


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
                {FormInput1.map(({ id, label, type, pattern }) => (
                    <div className='my-3'>
                        <label className='block text-[17px] font-bold my-2'>
                            {label}
                            <span className='text-red-700 mx-2'>*</span>
                        </label>
                        {type === 'select' ? <select
                            id={id}
                            required
                            value={ formData?.[id as keyof Form] as any || null }
                            onChange={handleInputChange}
                            className='rounded-md border w-full block border-gray-300 h-10 my-2 px-2'>
                            {ProvinceList.map(({ value, label }) => (
                                <option value={value}>
                                    {label}
                                </option>
                            ))}
                        </select> :
                            <input
                                id={id}
                                type={type}
                                pattern={pattern ? pattern : undefined}
                                value={ formData?.[id as keyof Form] as any || null }
                                onChange={handleInputChange}
                                required
                                className='rounded-md border w-full block border-gray-300 h-10 my-2 px-2'
                            />
                        }
                    </div>
                ))}
                <div>
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

export default PersonalInformation;