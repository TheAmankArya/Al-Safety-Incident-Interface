
import React, { useState } from 'react';
import { Incident, Severity } from '../types/incident';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Added the missing import

interface ReportIncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id'>) => void;
}

const ReportIncidentForm: React.FC<ReportIncidentFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title,
      description,
      severity,
      reported_at: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setDescription('');
    setSeverity('Medium');

    toast({
      title: "Success",
      description: "Incident reported successfully",
    });
  };

  return (
    <Card className="border-2 border-purple-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">Report New Incident</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full transition-shadow focus:shadow-purple-100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] transition-shadow focus:shadow-purple-100"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Severity
            </Label>
            <div className="flex gap-4">
              {(['Low', 'Medium', 'High'] as const).map((level) => (
                <label
                  key={level}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                    severity === level
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-200"
                  )}
                >
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={severity === level}
                    onChange={(e) => setSeverity(e.target.value as Severity)}
                    className="sr-only"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportIncidentForm;
