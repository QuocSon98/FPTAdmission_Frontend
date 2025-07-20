import React from "react";

interface TitleBannerProps {
  title: string;
}

const TitleBanner: React.FC<TitleBannerProps> = ({ title }) => {
    // Render
    return (
        <div className="flex items-center justify-center text-center relative h-[280px]">
            <img src="/src/app/assets/img03.png" alt="" className="brightness-[0.6]" />
            <h1 className="absolute text-[50px] text-white text-shadow-[2px_2px_4px_rgba(0_0_0_/_0.7)] font-semibold">
                {title}
            </h1>
        </div>
    );
}

export default TitleBanner;