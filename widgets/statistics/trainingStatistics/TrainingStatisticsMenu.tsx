import { theme } from '@/shared/config/theme';
import { UIText } from '@/shared/ui/UIText';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TrainingStatisticsMenuProps {
  buttons: { id: string; label: string }[];
  defaultSelected?: string;
  onButtonChange?: (id: string) => void;
}

export const TrainingStatisticsMenu = ({
  buttons,
  defaultSelected,
  onButtonChange,
}: TrainingStatisticsMenuProps) => {
  const [selected, setSelected] = useState<string>(defaultSelected || buttons[0]?.id || '');

  const handleClick = (id: string) => {
    setSelected(id);
    onButtonChange?.(id);
  };

  return (
    <View style={styles.menuContainer}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.id}
          style={[styles.button, selected === button.id && styles.activeButton]}
          onPress={() => handleClick(button.id)}
        >
          <UIText weight='semibold' style={selected === button.id ? styles.activeText : styles.inactiveText}>
            {button.label}
          </UIText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: theme.palette.darkBlue,
  },
  activeText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.white,
    textAlign: 'center'
  },
  inactiveText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.darkBlue,
  },
});