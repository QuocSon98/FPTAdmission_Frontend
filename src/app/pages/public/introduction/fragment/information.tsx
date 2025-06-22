import React from 'react';

interface InformationProps {
    // Define any props if needed
    title: string;
    content: string;
}

const Information: React.FC<InformationProps> = ({ title, content }) => {
    return (
        <>
            <div className='grid grid-cols-2 my-5'>
                <h2 className='text-[30px] font-semibold'>{title}</h2>
                <h3 className='text-content'>
                    {content}
                </h3>
            </div>
        </>
    );
};

export default Information;