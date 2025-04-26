
import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination in hiring processes. The issue was identified through regular audit logs and bias testing procedures.",
    severity: "Medium",
    reported_at: "2024-04-01"
  },
  {
    id: 2,
    title: "Unauthorized Data Access",
    description: "AI system accessed restricted database sections without proper authorization protocols. Immediate system shutdown was initiated to prevent potential data breaches.",
    severity: "High",
    reported_at: "2024-04-15"
  },
  {
    id: 3,
    title: "Minor Performance Degradation",
    description: "Slight decrease in model accuracy observed during routine monitoring. Impact was minimal and within acceptable parameters.",
    severity: "Low",
    reported_at: "2024-04-10"
  },
  {
    id: 4,
    title: "Resource Overconsumption",
    description: "AI system consumed excessive computational resources, affecting other system operations. Required optimization of resource allocation algorithms.",
    severity: "Medium",
    reported_at: "2024-04-20"
  }
];
