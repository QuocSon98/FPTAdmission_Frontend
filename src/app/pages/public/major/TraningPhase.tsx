import React from 'react';
import { CheckCircle } from 'lucide-react';

interface TrainingPhaseProps {
  phase: {
    title: string;
    description: string;
  };
  index: number;
}

const TrainingPhase: React.FC<TrainingPhaseProps> = ({ phase, index }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        {/* Phase number */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-500">
              <span className="text-2xl font-bold text-white">{index + 1}</span>
            </div>
            <div className="absolute -top-1 -right-1">
              <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
            {phase.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
          {phase.description}
        </p>

        {/* Progress indicator */}
        <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
            style={{ transitionDelay: `${index * 100}ms` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPhase;