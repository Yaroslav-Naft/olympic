import { View, ViewStyle, TextStyle, Image } from 'react-native';
import { Card } from './Card';
import { Icon, Text } from '../components';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
const meterImage = require('../../assets/images/meter.png');

interface DeviceCardProps {
  image: string;
  deviceName: string;
  children?: React.ReactNode;
}

export const DeviceCard = ({ image, deviceName, children }: DeviceCardProps) => {
  const { themed } = useAppTheme();
  return (
    <Card style={themed($temperatureCard)}>
      <View style={themed($contentContainer)}>
        <View style={themed($iconButtonContainer)}>
          <Image source={meterImage} style={$logo} />
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

const $content: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 15,
  // width: 100,
  // height: 100,
});

const $greetingContainer: ThemedStyle<TextStyle> = ({ colors }) => ({
  marginBottom: 5,
  width: 90,
  paddingTop: 10,
  // height: 100,
});

const $nameStyling: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 23,
});

const $iconButtonContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingRight: 10,
  paddingBottom: 10,
});

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  // marginLeft: 10,
  // marginRight: 10,
  width: 170,
  // marginBottom: 16,
});

const $logo: ImageStyle = {
  height: 60,
  width: 60,
};
