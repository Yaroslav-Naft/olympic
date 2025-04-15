import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  TextStyle,
  TouchableOpacitry,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Card, Icon, Screen, Switch, SwitchToggleProps, Text } from '../components';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import { $styles, colors } from '../theme';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { api } from '../services/api';
import { Toggle } from '@/components/Toggle/Toggle';

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
        <Text preset="heading" tx="homeScreen:title" style={themed($title)} />
        {/* <Text tx="homeScreen:tagLine" style={themed($tagline)} /> */}
        {isLoading ? (
          <ActivityIndicator size="large" style={$spinner} />
        ) : error ? (
          <Text style={$error}>{error}</Text>
        ) : (
          <View>
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
            <Card
              // heading="24°C"
              style={[themed($temperatureCard)]}
              // headingStyle={themed($temperatureHeading)}
              // contentTx="homeScreen:indoorTemp"
              // contentStyle={themed($temperatureContent)}
              // RightComponent={
              //   <View style={$controlsContainer}>
              //     <TouchableOpacity style={themed($controlButton)}>
              //       <Text style={themed($buttonText)}>-</Text>
              //     </TouchableOpacity>
              //     <TouchableOpacity style={themed($controlButton)}>
              //       <Text style={themed($buttonText)}>+</Text>
              //     </TouchableOpacity>
              //   </View>
              // }
            >
              <Text style={themed($label)}>Temperature Set Point</Text>
              <View style={themed($contentContainer)}>
                <Text style={themed($temperature)}>24°C</Text>
                <View style={themed($controlsContainer)}>
                  <TouchableOpacity style={themed($controlButton)}>
                    <Text style={themed($buttonText)}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={themed($controlButton)}>
                    <Text style={themed($buttonText)}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={themed($sliderContainer)}>
                <View style={themed($blueSlider)} />
                <View style={themed($graySlider)} />
              </View> */}

              <View style={themed($bottomContainer)}>
                <TouchableOpacity style={themed($iconButton)}>
                  <Icon icon="schedule" size={20} />
                  <Text style={themed($coolText)}>Cool</Text>
                </TouchableOpacity>
                <TouchableOpacity style={themed($iconButton)}>
                  <Text style={themed($iconText)}>A</Text>
                  <Text style={themed($coolText)}>Cool</Text>
                </TouchableOpacity>
                <TouchableOpacity style={themed($iconButton)}>
                  <Icon icon="settings" size={20} />
                  <Text style={themed($coolText)}>Heat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={themed($coolButton)}>
                  <Icon icon="snow" size={16} style={themed($coolIcon)} />
                  <Text style={themed($coolText)}>Cool</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}
      </Screen>
    );
  };

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

const $controlsContainer: ViewStyle = {
  flexDirection: 'row',
  position: 'absolute',
  right: 16,
  top: 16,
  gap: 8,
};

const $controlButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 40,
  height: 40,
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
  borderRadius: 18,
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
  marginLeft: 'auto',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 18,
  gap: 4,
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
  gap: 8,
});

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: colors.textDim,
  marginBottom: 8,
});

const $temperature: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 32,
  fontWeight: '600',
  color: colors.text,
});

//TODO: implement later
{
  /* <View style={themed($sliderContainer)}>
              <Slider
                value={temp ?? 24}
                min={16}
                max={30}
                step={0.5}
                style={{ width: 200, height: 40 }}
                onChange={val => setTemp(val)}
              />
            </View> */
}
