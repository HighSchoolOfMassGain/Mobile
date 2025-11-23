import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ExerciseStatistics } from '@/features/statistics/trainingStatistics/model/useTrainingStatisticsStore';
import { UIGraph } from '@/shared/ui/UIGraph';
import { UIText } from '@/shared/ui/UIText';
import { theme } from '@/shared/config/theme';

interface TrainingStatisticsGraphProps {
  data: ExerciseStatistics | null;
  typeData: 'weight' | 'count';
}

const sampleData = (entries: [string, number][], maxPoints: number = 5): [string, number][] => {
  if (entries.length <= maxPoints) {
    return entries;
  }

  const step = (entries.length - 1) / (maxPoints - 1);
  const sampled: [string, number][] = [];

  for (let i = 0; i < maxPoints; i++) {
    const index = Math.round(i * step);
    sampled.push(entries[index]);
  }

  return sampled;
};

export const TrainingStatisticsGraph = ({ data, typeData }: TrainingStatisticsGraphProps) => {
  if (!data?.data || Object.keys(data.data).length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <UIText style={styles.noDataText}>Нет данных для отображения</UIText>
      </View>
    );
  }

  const sortedEntries = Object.entries(data.data).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  const sampledEntries = sampleData(sortedEntries, 5);

  const labels = sampledEntries.map(([date]) =>
    new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    })
  );

  const values = sampledEntries.map(([, value]) => value);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        color: `${theme.palette.darkBlue}`,
        fill: true,
      },
    ],
  };

  return <UIGraph data={chartData} />;
};

const styles = StyleSheet.create({
  noDataContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: theme.palette.textGrey,
  },
});