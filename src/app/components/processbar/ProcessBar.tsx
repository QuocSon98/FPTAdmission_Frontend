import React from 'react'
import './ProcessBar.css'
import type { Process } from '../../pages/public/consultant/interface/interface';

interface ProcessBarProps {
    processes: Process[];
    onStepClick?: (stepId: string) => void; // Optional callback for process click
}

const ProcessBar: React.FC<ProcessBarProps> = ({ processes, onStepClick }) => {

    const getTooltipText = (process: any, index: number) => {
        if (process.title) return process.title;
        
        switch (process.status) {
            case 'completed':
                return `Step ${index + 1} - Completed`;
            case 'current':
                return `Step ${index + 1} - In Progress`;
            case 'upcoming':
                return `Step ${index + 1} - Upcoming`;
            default:
                return `Step ${index + 1}`;
        }
    };

    const handleStepClick = (e: React.MouseEvent, step: any) => {
        e.preventDefault();

        if (onStepClick && step.status !== 'upcoming') {
            onStepClick(step.id);
        }
    }
    return (
        <nav aria-label="Progress">
            <ol role="list" className="ilh iln">
                {processes.map((process, index) => (
                    <li key={index} className={index === processes.length - 1 ? 'ile' : 'ily ime ile'}>
                        <div aria-hidden="true" className="ild ilf ilh iln">
                            <div className={`progress-line ${process.status === 'completed' ? 'ill ilm ilu' : 'ill ilm ilt'}`}></div>
                        </div>
                        {process.status === 'completed' ? (
                            <a 
                                onClick={(e) => handleStepClick(e, process)} 
                                className="process-step process-step-completed ile ilh ilk iln ilo ilp ilu imd"
                                data-tooltip={getTooltipText(process, index)}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor" 
                                    aria-hidden="true" 
                                    data-slot="icon" 
                                    className="step-icon ilj ilz"
                                >
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ilc">Step {index + 1}</span>
                            </a>
                        ) : process.status === 'current' ? (
                            <a 
                                onClick={(e) => handleStepClick(e, process)} 
                                aria-current="step" 
                                className="process-step process-step-current ile ilh ilk iln ilo ilp ilq ils ilw"
                                data-tooltip={getTooltipText(process, index)}
                            >
                                <span aria-hidden="true" className="current-dot ili ilp ilu"></span>
                                <span className="ilc">Step {index + 1}</span>
                            </a>
                        ) : (
                            <a 
                                onClick={(e) => handleStepClick(e, process)} 
                                className="process-step process-step-upcoming imb ile ilh ilk iln ilo ilp ilq ilr ilw imc"
                                data-tooltip={getTooltipText(process, index)}
                            >
                                <span aria-hidden="true" className="upcoming-dot ili ilp"></span>
                                <span className="ilc">Step {index + 1}</span>
                            </a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default ProcessBar