import { create } from 'zustand';

export interface ExerciseFromLib {
  id: number;
  name: string;
  link_video?: string;
}

export interface ExerciseFilter {
  user_id?: number;
  id_exercise?: number;
  typeData: 'weight' | 'count';
}

export interface ExerciseStatisticsData {
  [date: string]: number;
}

export interface ExerciseStatistics {
  data: ExerciseStatisticsData;
}

interface TrainingStatisticsState {
  statistics: ExerciseStatistics | null;
  setStatistics: (stats: ExerciseStatistics) => void;
  clearStatistics: () => void;
  
}

export const useTrainingStatisticsStore = create<TrainingStatisticsState>((set) => ({
  statistics: null,
  setStatistics: (statistics) => set({ statistics }),
  clearStatistics: () => set({ statistics: null }),
}));