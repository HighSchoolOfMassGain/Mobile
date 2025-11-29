import { api } from '@shared/api/client';
import type { ExerciseFilter, ExerciseStatistics, ExerciseFromLib } from '../model/useTrainingStatisticsStore';

export const getTrainingStatistic = async (
  filter: ExerciseFilter
): Promise<ExerciseStatistics> => {
  const { data } = await api.post<ExerciseStatistics>('/statistic/get/exercises', filter);
  return data;
};

export const getUserTrainingStatistic = async (
  userId: number,
  filter: ExerciseFilter
): Promise<ExerciseStatistics> => {
  const { data } = await api.post<ExerciseStatistics>(
    `/get_exercise_statistic/${userId}`,
    filter
  );
  return data;
};

export const getAllExercisesFromLib = async (): Promise<ExerciseFromLib[]> => {
  const { data } = await api.get<{exercises: ExerciseFromLib[]}>('/libraries/training_exercises/get_all');
  return data.exercises;
};