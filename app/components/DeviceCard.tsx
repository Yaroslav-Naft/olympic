import { View, ViewStyle, TextStyle, Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { Card } from './Card';
import { Text } from '../components';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';

interface DeviceCardProps {
  imageSrc: ImageSourcePropType;
  deviceName: string;
  children?: React.ReactNode;
}

export const DeviceCard = ({ imageSrc, deviceName, children }: DeviceCardProps) => {
  const { themed } = useAppTheme();
  return (
    <Card style={themed($temperatureCard)}>
      <View style={themed($contentContainer)}>
        <View style={themed($iconButtonContainer)}>
          <Image source={imageSrc} style={themed($imageStyle)} />
          <View style={themed($greetingContainer)}>
            <Text style={themed($content)}>{deviceName}</Text>
          </View>
        </View>
        <View>{children}</View>
      </View>
    </Card>
  );
};
const $temperatureCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderRadius: 16,
  padding: spacing.md,
  marginBottom: spacing.xs,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
});

const $content: ThemedStyle<TextStyle> = () => ({
  fontSize: 15,
});

const $greetingContainer: ThemedStyle<TextStyle> = ({ colors }) => ({
  marginBottom: 5,
  width: 90,
  paddingTop: 10,
});

const $iconButtonContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingRight: 10,
  paddingBottom: 10,
});

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: 170,
});

const $imageStyle: ThemedStyle<ImageStyle> = () => ({
  height: 60,
  width: 60,
});
