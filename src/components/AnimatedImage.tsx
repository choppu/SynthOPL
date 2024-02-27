import {FC } from "react";
import {StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

type AnimatedImageProps = {
  img: string | React.JSX.Element | undefined;
  bgColor: string;
  shadowColor: string;
};

const AnimatedImage: FC<AnimatedImageProps> = props => {
  const {img, bgColor, shadowColor} = props;

  const glowAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
                withSequence(
                  withTiming(1.2, { duration: 1500 }),
                  withTiming(1.6, { duration: 1500 })
                ),
                -1,
                true
            ),
        },
  ],
}));

  return (
    <View>
      <Animated.View style={[animatedImageStyle.glowContainer, glowAnimation]}>

      </Animated.View>
    </View>
  )};

const animatedImageStyle = StyleSheet.create({
  glowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    bottom: 0,
    left: 0,
    right: 4,
  }
});

export default AnimatedImage;