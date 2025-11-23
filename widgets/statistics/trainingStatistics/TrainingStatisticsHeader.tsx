import { theme } from '@/shared/config/theme';
import { UIText } from '@/shared/ui/UIText';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const TrainingStatisticsHeader = () => {
  return (
    <View style={styles.header}>
      <UIText weight='semibold' style={styles.title}>Тренировочная статистика</UIText>
      <UIText weight='regular' style={styles.subtitle}>
        Для корректной работы графика рекомендуем провести минимум 3 дня тренировок
      </UIText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: theme.palette.black
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.palette.black,
    marginTop: 4,
  },
});