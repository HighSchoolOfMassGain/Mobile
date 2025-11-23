import { queryOptions, useQuery } from '@tanstack/react-query';
import { getTrainingStatistic } from '../api/trainingStatisticsApi';
import { ExerciseFilter, useTrainingStatisticsStore } from '../model/useTrainingStatisticsStore';
import React from 'react';

const trainingStatisticsOptions = (filter: ExerciseFilter) =>
  queryOptions({
    queryKey: ['training-statistics', filter] as const,
    queryFn: () => getTrainingStatistic(filter),
    enabled: !!filter.user_id && !!filter.id_exercise,
  });

export const useTrainingStatistics = (filter: ExerciseFilter) => {
  const setStatistics = useTrainingStatisticsStore((s) => s.setStatistics);

  const result = useQuery(trainingStatisticsOptions(filter));

  React.useEffect(() => {
    if (result.data) {
      setStatistics(result.data);
    }
  }, [result.data, setStatistics]);

  return result;
};