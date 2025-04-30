import { useAppTheme } from '@/utils/useAppTheme';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { ThemedStyle } from '@/theme';
import { Text } from './Text';

interface OccupancyButtonProps {
  icon: string;
  label: string;
  value: string;
  currentValue: string;
  onPress: (val: string) => void;
}

export const OccupancyButton: React.FC<OccupancyButtonProps> = ({
  icon,
  label,
  value,
  currentValue,
  onPress,
}: OccupancyButtonProps) => {
  const { themed } = useAppTheme();
  const isSelected = value == currentValue;

  return (
    <View>
      <TouchableOpacity
        style={themed(isSelected ? $iconButtonSelected : $iconButton)}
        onPress={() => onPress(value)}
      >
        <View style={$iconButtonRow}>
          <View style={$iconContainer}>
            <Icon icon="power" color="#374151" size={15} />
          </View>
          <View>
            <Text size="xs">{label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const $iconButtonRow: ViewStyle = {
  flexDirection: 'row',
};

const $iconContainer: ViewStyle = {
  paddingTop: 3,
  paddingRight: 2,
};

const $iconButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 80,
  height: 36,
  borderRadius: 10,
  borderWidth: 1,
  marginRight: 2,
  borderColor: colors.palette.neutral200,
  backgroundColor: colors.palette.neutral100,
  justifyContent: 'center',
  alignItems: 'center',
});

const $iconButtonSelected: ThemedStyle<ViewStyle> = () => ({
  width: 80,
  height: 36,
  borderRadius: 10,
  borderWidth: 1,
  marginRight: 2,
  borderColor: '#2563EB',
  backgroundColor: '#EBF4FF',
  justifyContent: 'center',
  alignItems: 'center',
});
