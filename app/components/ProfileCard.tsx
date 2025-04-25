import { View, ViewStyle, TextStyle } from 'react-native';
import { Card } from './Card';
import { Icon, Text } from '../components';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';

interface ProfileCardProps {
  iconType: string;
  txContent: string;
  profileName: string;
  size: number;
}

export const ProfileCard = ({ iconType, txContent, profileName, size }: ProfileCardProps) => {
  const { themed } = useAppTheme();
  return (
    <Card style={themed($temperatureCard)}>
      <View style={themed($contentContainer)}>
        <View style={themed($iconButtonContainer)}>
          <Icon icon={iconType} size={size} />
        </View>
        <View>
          <View style={themed($greetingContainer)}>
            <Text style={themed($content)}>{txContent}</Text>
          </View>
          <Text style={themed($nameStyling)}>{profileName}</Text>
        </View>
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
});

const $greetingContainer: ThemedStyle<TextStyle> = ({ colors }) => ({
  marginBottom: 5,
});

const $nameStyling: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 23,
});

const $iconButtonContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingRight: 10,
});

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});
