import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UIBackButton } from '@/shared/ui/UIBackButton';

interface BasicHeaderProps {
  onPress?: () => void;
}

export const BasicHeader: React.FC<BasicHeaderProps> = ({ onPress }) => {
  return (
    <View style={styles.editHeader}>
      <UIBackButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  editHeader: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});