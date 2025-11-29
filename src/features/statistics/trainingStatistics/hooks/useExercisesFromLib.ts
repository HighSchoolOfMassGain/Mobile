import { useQuery } from '@tanstack/react-query';
import { getAllExercisesFromLib } from '../api/trainingStatisticsApi';
import type { ExerciseFromLib } from '../model/useTrainingStatisticsStore';

export const useExercisesFromLib = () => {
  return useQuery<ExerciseFromLib[], Error>({
    queryKey: ['exercises-from-lib'],
    queryFn: getAllExercisesFromLib,
  });
};