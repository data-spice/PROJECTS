export interface MonthlyAdmission {
  hospital_id: number;
  hospital_name: string;
  year: number;
  month: number;
  total_admissions: number;
}

export interface BedUtilization {
  hospital_id: number;
  hospital_name: string;
  total_beds: number;
  occupied_beds: number;
  occupancy_rate: number;
}

export interface DiseaseTrend {
  diagnosis: string;
  year: number;
  month: number;
  total_cases: number;
}

export interface LabWorkload {
  hospital_id: number;
  year: number;
  month: number;
  total_tests: number;
}