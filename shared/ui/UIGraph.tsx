import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { theme } from '../config/theme';

interface UIGraphProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      color?: string;
      fill?: boolean;
    }[];
  };
}

export const UIGraph: React.FC<UIGraphProps> = ({ data }) => {
  if (!data.datasets.length || data.datasets[0].data.length === 0) {
    return null;
  }

  const dataset = data.datasets[0];
  const { data: values, color = '#007AFF', fill = false } = dataset;
  const labels = data.labels;

  const chartData = values.map((value, index) => ({
    value,
    label: labels[index],
  }));

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={300}
        height={220}
        // Линейный график (без скруглений)
        curved={false}
        // Цвет линии
        color={color}
        // Точки
        dataPointsColor={color}
        dataPointsRadius={4}
        // Сетка
        showYAxisIndices={true}
        yAxisIndicesColor="#e0e0e0"
        yAxisTextStyle={{ color: `${theme.palette.textGrey}`, fontSize: 12 }}
        // Подписи по X
        xAxisLabelTextStyle={{ color: `${theme.palette.textGrey}`, fontSize: 12 }}
        // Отступы
        spacing={70}
        initialSpacing={0}
        endSpacing={0}
        // Префиксы/суффиксы
        yAxisLabelPrefix=""
        yAxisLabelSuffix=""
        // Градиентная заливка
        areaChart={fill}
        startOpacity={fill ? 0.9 : 0}
        endOpacity={fill ? 0 : 0}
        startFillColor={fill ? color : `${theme.palette.gradWhite}`}
        endFillColor={fill ? color : `${theme.palette.darkBlue}`}
        // Анимация
        animateOnDataChange={true}
        animationDuration={800}
        // Дополнительные настройки
        hideRules={false}
        rulesColor="#e0e0e0"
        rulesType="solid"
        noOfSections={4}
        maxValue={Math.max(...values) * 1.1} // +10% от максимального значения
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
});