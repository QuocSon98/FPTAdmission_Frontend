// import React from 'react'
// import './ProcessBar.css'
// import type { Process } from '../../pages/public/consultant/interface/interface';

// interface ProcessBarProps {
//     processes: Process[];
//     onStepClick?: (stepId: string) => void; // Optional callback for process click
// }

// const ProcessBar: React.FC<ProcessBarProps> = ({ processes, onStepClick }) => {

//     const getTooltipText = (process: any, index: number) => {
//         if (process.title) return process.title;

//         switch (process.status) {
//             case 'completed':
//                 return `Step ${index + 1} - Completed`;
//             case 'current':
//                 return `Step ${index + 1} - In Progress`;
//             case 'upcoming':
//                 return `Step ${index + 1} - Upcoming`;
//             default:
//                 return `Step ${index + 1}`;
//         }
//     };

//     const handleStepClick = (e: React.MouseEvent, step: any) => {
//         e.preventDefault();

//         if (onStepClick && step.status !== 'upcoming') {
//             onStepClick(step.id);
//         }
//     }
//     return (
//         <nav aria-label="Progress">
//             <ol role="list" className="ilh iln">
//                 {processes.map((process, index) => (
//                     <li key={index} className={index === processes.length - 1 ? 'ile' : 'ily ime ile'}>
//                         <div aria-hidden="true" className="ild ilf ilh iln">
//                             <div className={`progress-line ${process.status === 'completed' ? 'ill ilm ilu' : 'ill ilm ilt'}`}></div>
//                         </div>
//                         {process.status === 'completed' ? (
//                             <a 
//                                 onClick={(e) => handleStepClick(e, process)} 
//                                 className="process-step process-step-completed ile ilh ilk iln ilo ilp ilu imd"
//                                 data-tooltip={getTooltipText(process, index)}
//                             >
//                                 <svg 
//                                     xmlns="http://www.w3.org/2000/svg" 
//                                     viewBox="0 0 20 20" 
//                                     fill="currentColor" 
//                                     aria-hidden="true" 
//                                     data-slot="icon" 
//                                     className="step-icon ilj ilz"
//                                 >
//                                     <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"></path>
//                                 </svg>
//                                 <span className="ilc">Step {index + 1}</span>
//                             </a>
//                         ) : process.status === 'current' ? (
//                             <a 
//                                 onClick={(e) => handleStepClick(e, process)} 
//                                 aria-current="step" 
//                                 className="process-step process-step-current ile ilh ilk iln ilo ilp ilq ils ilw"
//                                 data-tooltip={getTooltipText(process, index)}
//                             >
//                                 <span aria-hidden="true" className="current-dot ili ilp ilu"></span>
//                                 <span className="ilc">Step {index + 1}</span>
//                             </a>
//                         ) : (
//                             <a 
//                                 onClick={(e) => handleStepClick(e, process)} 
//                                 className="process-step process-step-upcoming imb ile ilh ilk iln ilo ilp ilq ilr ilw imc"
//                                 data-tooltip={getTooltipText(process, index)}
//                             >
//                                 <span aria-hidden="true" className="upcoming-dot ili ilp"></span>
//                                 <span className="ilc">Step {index + 1}</span>
//                             </a>
//                         )}
//                     </li>
//                 ))}
//             </ol>
//         </nav>
//     )
// }


import React from 'react';
import { FaRegCircle } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";
import type { Process } from '../../pages/public/consultant/interface/interface';

interface ProcessBarProps {
    processes: Process[];
    onStepClick?: (stepId: string) => void;
}

const ProcessBar: React.FC<ProcessBarProps> = ({ processes, onStepClick }) => {

    const handleStepClick = (process: Process) => {
        if (onStepClick && (process.status === 'completed' || process.status === 'current')) {
            onStepClick(process.id);
        }
    };

    const getTooltipText = (process: any) => {
        if (process.title) return process.title;
    };

    return (
        <nav aria-label="Progress" className="mb-8">
            <ol className="flex items-center justify-center space-x-8">
                {processes.map((process, index) => (
                    <li key={process.id} className="flex items-center">
                        <div className="flex flex-col items-center group">
                            <div className="relative">
                                <button
                                    onClick={() => handleStepClick(process)}
                                    disabled={process.status === 'upcoming'}
                                    data-tooltip={getTooltipText(process)}
                                    className={`
                                    relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 transform
                                    ${process.status === 'completed'
                                            ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600 cursor-pointer hover:scale-110 shadow-lg hover:shadow-xl animate-pulse'
                                            : process.status === 'current'
                                                ? 'bg-white border-orange-500 text-orange-500 shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 ring-4 ring-orange-200 animate-bounce'
                                                : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed hover:bg-gray-200'
                                        }
                                `}
                                >
                                    {process.status === 'completed' ? (
                                        <IoCheckmark className="h-6 w-6 animate-pulse" />
                                    ) : (
                                        <FaRegCircle className={`h-6 w-6 ${process.status === 'current' ? 'fill-current animate-pulse' : ''}`} />
                                    )}
                                    {process.status === 'current' && (
                                        <div className="absolute inset-0 rounded-full border-2 border-orange-300 animate-ping"></div>
                                    )}
                                </button>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                    {process.title}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        </div>
                        {index < processes.length - 1 && (
                            <div className={`
                                h-0.5 w-16 ml-8
                                ${processes[index + 1].status !== 'upcoming' ? 'bg-orange-500' : 'bg-gray-300'}
                            `} />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default ProcessBar