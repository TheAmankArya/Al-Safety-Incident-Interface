
import React, { useState } from 'react';
import { Incident } from '../types/incident';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-[#F2FCE2] text-green-700 border-green-200';
      case 'Medium':
        return 'bg-[#FEF7CD] text-yellow-700 border-yellow-200';
      case 'High':
        return 'bg-[#FEC6A1] text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-6 transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.01] transform",
        "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">{incident.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span 
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border",
                getSeverityColor(incident.severity)
              )}
            >
              {incident.severity}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              {new Date(incident.reported_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4 text-gray-600 leading-relaxed animate-accordion-down border-t pt-4">
          {incident.description}
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
