import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { UIText } from '@shared/ui/UIText';
import { theme } from '@shared/config/theme';

import { TrainingStatisticsHeader } from '@widgets/statistics/trainingStatistics/TrainingStatisticsHeader';
import { TrainingStatisticsMenu } from '@widgets/statistics/trainingStatistics/TrainingStatisticsMenu';
import { TrainingStatisticsGraph } from '@widgets/statistics/trainingStatistics/TrainingStatisticsGraph';
import { UISelect } from '@shared/ui/UISelector';

import { useTrainingStatisticsStore } from '@features/statistics/trainingStatistics/model/useTrainingStatisticsStore';
import { useExercisesFromLib } from '@features/statistics/trainingStatistics/hooks/useExercisesFromLib';
import { useTrainingStatistics } from '@features/statistics/trainingStatistics/hooks/useTrainingStatistics';

import type { ExerciseFromLib } from '@features/statistics/trainingStatistics/model/useTrainingStatisticsStore';
import type { ExerciseFilter } from '@features/statistics/trainingStatistics/model/useTrainingStatisticsStore';
import { BasicHeader } from '@widgets/basicHeader/BasicHeader';
import { useCurrentUserStore } from '@entities/user';

export const TrainingStatisticsPage = () => {
  const router = useRouter();

  const user = useCurrentUserStore((s) => s.user);
  const trainingStatsStore = useTrainingStatisticsStore();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseFromLib | null>(null);
  const [activeChart, setActiveChart] = useState<'count' | 'weight'>('count');


/*   const mockExerciseStatistics: ExerciseStatistics = {
    data: {
      '2025-04-01': 60,
      '2025-04-03': 80,
      '2025-04-05': 45,
      '2025-04-08': 23,
      '2025-04-10': 67,
      '2025-04-12': 70,
      '2025-04-15': 18,
      '2025-04-18': 72,
      '2025-04-20': 75,
    },
  }; 
  мок данные для тестирования */

  const {
    data: exercises = [],
    isLoading: isLoadingExercises,
    error: exercisesError,
  } = useExercisesFromLib();

  useEffect(() => {
    if (exercisesError) {
      Alert.alert('Ошибка', 'Не удалось загрузить упражнения');
    }
  }, [exercisesError]);

  // пока что только для своего user_id для других пользователей добавить мб после страницы поиска
  const filter: ExerciseFilter | null = {
    user_id: user?.user_id,
    id_exercise: selectedExercise?.id,
    typeData: activeChart,
  }

  const { isLoading: isLoadingStats } = useTrainingStatistics(filter);

  return (
    <View style={styles.container}>
      <BasicHeader onNavigate={() => router.push("/profile")}/>
      <TrainingStatisticsHeader/>
      <View style={styles.menuContainer}>
      {isLoadingExercises ? (
        <View style={styles.loaderWrapper}>
           <UIText>...</UIText>
        </View>
      ) : (
        <UISelect
          items={exercises}
          value={selectedExercise}
          onChange={setSelectedExercise}
          keyField="id"
          labelField="name"
          placeholder="Выберите упражнение"
        />
      )}

      {selectedExercise && (
        <>
          <TrainingStatisticsMenu
            buttons={[
              { id: 'count', label: 'повторения' },
              { id: 'weight', label: 'вес' },
              { id: 'distance', label: 'дистанция'}
            ]}
            defaultSelected="count"
            onButtonChange={(id) => setActiveChart(id as 'count' | 'weight')}
          />

          {isLoadingStats ? (
            <View style={styles.loaderWrapper}>
              <UIText>...</UIText>
            </View>
          ) : (
            <TrainingStatisticsGraph
              typeData={activeChart}
              data={trainingStatsStore.statistics}
              //data={mockExerciseStatistics}
            />
          )}
        </>
      )}
      </View>
      {!selectedExercise && !isLoadingExercises && (
        <UIText style={styles.hintText}>
          Выберите упражнение, чтобы увидеть статистику
        </UIText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.white,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  menuContainer: {
    flexDirection: 'column',
    gap: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: theme.palette.totalBlack,
  },
  loaderWrapper: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  hintText: {
    fontSize: 16,
    color: theme.palette.darkGrey,
    marginTop: 24,
    textAlign: 'center',
  },
});