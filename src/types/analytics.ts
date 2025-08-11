export type ApplicationFunnelData = {
  name: string;
  value: number;
};

export type UniversityDistributionData = {
  name: string;
  value: number;
};

export type GeographicDistributionData = {
  name: string;
  applicants: number;
};

export type DashboardAnalyticsData = {
  totalApplicants: number;
  acceptanceRate: number;
  avgReviewTime: number;
  applicationFunnel: ApplicationFunnelData[];
  universityDistribution: UniversityDistributionData[];
  geographicDistribution: GeographicDistributionData[];
};
