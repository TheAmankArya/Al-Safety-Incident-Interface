
import React, { useState } from 'react';
import { mockIncidents } from '../data/mockIncidents';
import { Incident, Severity } from '../types/incident';
import IncidentCard from '../components/IncidentCard';
import ReportIncidentForm from '../components/ReportIncidentForm';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, Filter } from 'lucide-react';

const Index = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showReportForm, setShowReportForm] = useState(false);

  const filteredAndSortedIncidents = incidents
    .filter((incident) => severityFilter === 'All' || incident.severity === severityFilter)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleNewIncident = (newIncident: Omit<Incident, 'id'>) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map(i => i.id)) + 1,
    };
    setIncidents([incident, ...incidents]);
    setShowReportForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            AI Safety Incident Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Monitor and track AI safety incidents</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-4 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Filter size={16} />
                  {severityFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(['All', 'Low', 'Medium', 'High'] as const).map((severity) => (
                  <DropdownMenuItem
                    key={severity}
                    onClick={() => setSeverityFilter(severity)}
                  >
                    {severity}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="gap-2 w-full sm:w-auto"
            >
              {sortOrder === 'newest' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>

          <Button 
            onClick={() => setShowReportForm(!showReportForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full sm:w-auto"
          >
            {showReportForm ? 'Close Form' : 'Report Incident'}
          </Button>
        </div>

        {showReportForm && (
          <div className="mb-6 animate-fade-in">
            <ReportIncidentForm onSubmit={handleNewIncident} />
          </div>
        )}

        <div className="space-y-4">
          {filteredAndSortedIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
          {filteredAndSortedIncidents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No incidents found matching the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
