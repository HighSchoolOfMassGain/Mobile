import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";

import { UIText } from "@shared/ui/UIText";
import { UiInput } from "@shared/ui/UiInput";
import { palette } from "../config/theme";

type UILabeledInputProps = React.ComponentProps<typeof UiInput> & {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const UILabeledInput: React.FC<UILabeledInputProps> = ({
  label,
  containerStyle,
  labelStyle,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <UIText weight="semibold" style={[styles.label, labelStyle]}>
          {label}
        </UIText>
      ) : null}

      <UiInput {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: palette.black
  },
});
