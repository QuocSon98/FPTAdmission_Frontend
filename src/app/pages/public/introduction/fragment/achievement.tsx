import React from 'react';

interface AchievementProps {
    // Define any props if needed
    title: string;
    content: string;
    imgSrc: string;
}

const AchievementFragment: React.FC<AchievementProps> = ({ title, content, imgSrc }) => {
    return (
        <div className=''>
            <h3 className='font-bold my-1'>{title}</h3>
            <h3 className=''>{content}</h3>
            <div className='flex justify-center'>
                <img className='' src={imgSrc} alt="" />
            </div>
        </div>
    );
};

export default AchievementFragment;