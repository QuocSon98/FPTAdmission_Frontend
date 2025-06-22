import React from 'react';
import ITMajorPage from '../IMajorPage';
import { ITMajorsData } from '../IMajorData';

export const InformationSecurity: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.informationSecurity} />;
};

export const SoftwareEngineering: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.softwareEngineering} />;
};

export const DigitalCarTechnology: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.digitalCarTechnology} />;
};
export const DigitalConversion: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.digitalConversion} />;
};
export const ArtificialIntelligence: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.artificialIntelligence} />;
};
export const SemiconductorDesign: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.semiconductorDesign} />;
};
export const DigitalDesign: React.FC = () => {
    return <ITMajorPage majorData={ITMajorsData.digitalDesign} />;
};

