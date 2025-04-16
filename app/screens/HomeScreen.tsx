import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Card, Icon, Screen, Switch, SwitchToggleProps, Text } from '../components';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import { $styles, colors } from '../theme';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { api } from '../services/api';
import { ProfileCard } from '@/components/ProfileCard';
import Slider from '@react-native-community/slider';
import { DeviceCard } from '@/components/DeviceCard';

export function TempSwitch(props: SwitchToggleProps) {
  const [val, setVal] = useState(props.value || false);
  return <Switch value={val} onPress={() => setVal(!val)} />;
}

export const HomeScreen: FC<DemoTabScreenProps<'Home' | 'Calendar' | 'Comfort' | 'Settings'>> =
  function HomeScreen(_props) {
    const { themed } = useAppTheme();
    const [temp, setTemp] = useState<number | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      async function fetchTemp() {
        setIsLoading(true);
        setError('');
        const result = await api.getTemp();

        if (result.kind === 'ok') {
          setTemp(result.data);
        } else {
          setError('Failed to load Temperature data');
          setTemp(null);
        }

        setIsLoading(false);
      }

      fetchTemp();
    }, []);

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={['top']}>
        <Text preset="heading" size="md" tx="ECY - STAT" style={themed($title)} />
        {isLoading ? (
          <ActivityIndicator size="large" style={$spinner} />
        ) : error ? (
          <Text style={$error}>{error}</Text>
        ) : (
          <View>
            <ProfileCard iconType="user" size={50} txContent="Hello 👋" profileName="Fortis BC" />
            <Card
              heading={`${temp != null && !isNaN(temp) ? Math.round(temp) : '--'}°C`}
              style={themed($temperatureCard)}
              headingStyle={themed($temperatureHeading)}
              contentTx="homeScreen:indoorTemp"
              contentStyle={themed($temperatureContent)}
              RightComponent={
                <View style={themed($powerButton)}>
                  <TempSwitch />
                </View>
              }
              FooterComponent={
                <View style={$footerContainer}>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>🌥 32°C |</Text>
                  </View>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>💨 55% |</Text>
                  </View>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>🕒 Thu 24 Nov | 5:45 PM</Text>
                  </View>
                </View>
              }
            />
            <Card style={[themed($temperatureCard)]}>
              <View style={themed($tempSetpointContainer)}>
                <Text style={themed($label)}>Temperature Set Point</Text>
              </View>
              <View style={themed($contentContainer)}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    overflow: 'visible',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: 'bold',
                      fontFamily: 'System',
                      color: '#374151',
                      lineHeight: 48,
                      includeFontPadding: false,
                      textAlignVertical: 'center',
                      backgroundColor: 'transparent',
                      paddingTop: 0,
                    }}
                  >
                    24°C
                  </Text>
                </View>
                <View style={themed($controlsContainer)}>
                  <TouchableOpacity style={themed($controlButton)}>
                    <Text style={themed($buttonText)}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={themed($controlButton)}>
                    <Text style={themed($buttonText)}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Add slider here later */}
              {/* <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              /> */}

              <View style={themed($bottomContainer)}>
                <View style={themed($iconButtonContainer)}>
                  <TouchableOpacity style={themed($iconButton)}>
                    <Icon icon="power" color="#374151" size={15} />
                  </TouchableOpacity>
                </View>
                <View style={themed($iconButtonContainer)}>
                  <TouchableOpacity style={themed($iconButton)}>
                    <Icon icon="a" color="#374151" size={15} />
                  </TouchableOpacity>
                </View>
                <View style={themed($iconButtonContainer)}>
                  <TouchableOpacity style={themed($iconButton)}>
                    <Icon icon="sun" color="#374151" size={15} />
                  </TouchableOpacity>
                </View>
                <View style={themed($iconButtonContainer)}>
                  <TouchableOpacity style={themed($iconButton)}>
                    <Icon icon="snow" size={15} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
            <DeviceCard image="meter" deviceName="Fortis BC Suite Meter">
              <View>
                <Text style={themed($label)}>Rate: 4 BTU/hr</Text>
                <Text style={themed($label)}>Accum. Consumption: 100 BTU</Text>
                <Text style={themed($label)}>Monthly Cost: 102.34 CAD</Text>
                <Text style={themed($label)}>DCW Meter Consumption: 102L</Text>
              </View>
            </DeviceCard>
          </View>
        )}
      </Screen>
    );
  };

const $tempSetpointContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginBottom: 16,
});

const $temperatureCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: 'white',
  borderRadius: 16,
  padding: spacing.md,
  marginBottom: spacing.xs,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
});

const $sliderStyle: ThemedStyle<ViewStyle> = () => ({
  width: '100%',
  height: 40,
});

const $powerButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: 'absolute',
  right: spacing.sm,
  top: spacing.sm,
  backgroundColor: 'white',
  padding: spacing.xs,
  borderRadius: 20,
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
});

const $temperatureHeading: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 20,
  fontWeight: '600',
  color: colors.text,
  marginBottom: spacing.xs,
});

const $temperatureContent: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 18,
  color: colors.textDim,
  marginBottom: spacing.md,
});

const $footerContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const $footerItem: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $footerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: colors.textDim,
});

const $controlsContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: 'row',
  position: 'absolute',
  verticalAlign: 'center',
  right: 0,
  top: 0,
  gap: 12,
});

const $iconButtonContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  // padding: 30,
});

const $controlButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 45,
  height: 45,
  borderRadius: 8,
  borderWidth: 1, // Add border
  borderColor: colors.palette.neutral200,
  shadowColor: colors.palette.neutral800,
  verticalAlign: 'center',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
});

const $buttonText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: 22,
  color: colors.palette.neutral800,
  textAlign: 'center',
  fontWeight: '200', // Increased weight for more prominence
  includeFontPadding: false,
  lineHeight: 22,
  fontFamily: 'System',
});

const $title: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  fontFamily: 'System',
});

const $spinner: ViewStyle = {
  marginVertical: 20,
};

const $error: TextStyle = {
  color: 'red',
  textAlign: 'center',
  marginVertical: 20,
};

const $iconButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 36,
  height: 36,
  borderRadius: 10,
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 10,
  borderWidth: 1, // Add border
  borderColor: colors.palette.neutral200,
  backgroundColor: colors.palette.neutral100,
  justifyContent: 'center',
  alignItems: 'center',
});

const $iconText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 16,
  fontWeight: '500',
  color: colors.text,
});

const $coolButton: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f3f4f6',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 24,
  gap: 6,
  borderWidth: 1,
  borderColor: '#e5e7eb',
});

const $testContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const $coolIcon: ThemedStyle<TextStyle> = {
  color: '#007AFF',
};

const $coolText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  fontWeight: '500',
  color: colors.text,
});

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
});

const $blueSlider: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: '#007AFF',
});

const $graySlider: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: '#F5F5F5',
});

const $bottomContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  // marginLeft: 16,
  // marginRight: 16,
});

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: '#6b7280',
  marginBottom: 8,
});

const $temperature: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 40,
  fontFamily: 'System',
  letterSpacing: 0.5,
  includeFontPadding: false,
  // textAlign: 'left',
  fontWeight: '600',
  color: '#374151',
});

const $sliderContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: '100%',
  padding: spacing.md,
  borderRadius: spacing.md,
  marginTop: spacing.sm,
  minHeight: 200, // Add explicit height to make it visible
  borderWidth: 1, // Add border to see the container boundaries
  borderColor: colors.palette.neutral300,
  alignItems: 'center', // Center children horizontally
  justifyContent: 'center', // Center children vertically
});

//Later
//Remove unecessary code
//Break down into own components
