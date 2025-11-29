import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import BackButtonIcon from '@assets/icons/navBackIcon.svg';
interface UIBackButtonProps {
    onPress?: () => void;
}

export const UIBackButton: React.FC<UIBackButtonProps> = ({ onPress }) => {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                pressed && styles.pressed,
            ]}
        >
            <BackButtonIcon width={16} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
});