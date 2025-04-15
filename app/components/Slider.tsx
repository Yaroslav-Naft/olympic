// // app/components/Slider.tsx
// import RNSlider from '@react-native-community/slider';
// import { View } from 'react-native';
// import { useAppTheme } from '@/utils/useAppTheme';
// import type { ThemedStyle } from '@/theme';
// import type { ViewStyle } from 'react-native';

// type SliderProps = {
//   value?: number;
//   min?: number;
//   max?: number;
//   step?: number;
//   onChange?: (val: number) => void;
//   onFinalChange?: (val: number) => void;
// };

// export const Slider = ({
//   value = 0,
//   min = 0,
//   max = 100,
//   step = 0.1,
//   onChange,
//   onFinalChange,
// }: SliderProps) => {
//   const { themed, theme } = useAppTheme();

//   return (
//     <View style={themed($container)}>
//       <RNSlider
//         value={value}
//         minimumValue={min}
//         maximumValue={max}
//         step={step}
//         onValueChange={onChange}
//         onSlidingComplete={onFinalChange}
//         minimumTrackTintColor={theme.colors.palette.secondary500}
//         maximumTrackTintColor={theme.colors.palette.neutral300}
//         thumbTintColor={theme.colors.palette.secondary500}
//         style={themed($slider)}
//       />
//     </View>
//   );
// };

// const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
//   width: '100%',
//   height: 40,
//   paddingHorizontal: spacing.sm,
//   justifyContent: 'center',
// });

// const $slider: ThemedStyle<ViewStyle> = () => ({
//   width: '100%',
//   height: 40,
// });

import Slider from '@react-native-community/slider';
import { ViewStyle } from 'react-native';
import { useAppTheme } from '@/utils/useAppTheme';
import type { ThemedStyle } from '@/theme';

type SliderProps = {
  value: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: (value: number) => void;
};

export function CustomSlider({
  value,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  onValueChange,
}: SliderProps) {
  const { theme } = useAppTheme();

  return (
    <Slider
      value={value}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      onValueChange={onValueChange}
      style={$slider}
      minimumTrackTintColor={theme.colors.palette.secondary500}
      maximumTrackTintColor={theme.colors.palette.neutral300}
      thumbTintColor={theme.colors.palette.secondary500}
    />
  );
}

const $slider: ViewStyle = {
  width: '100%',
  height: 40,
};
