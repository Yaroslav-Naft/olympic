import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Card, Icon, Screen, Switch, SwitchToggleProps, Text } from '../components';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import { $styles } from '../theme';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { ProfileCard } from '@/components/ProfileCard';
import { DeviceCard } from '@/components/DeviceCard';
import { useDateTime } from '@/components/hooks/api-queries/useDateTime';
import { useTemperature } from '@/components/hooks/api-queries/useTemperature';
import { useTempSetpoint } from '@/components/hooks/api-mutations/useTempSetpoint';
import { useBTUMeter } from '@/components/hooks/api-queries/useBTUMeter';
import { useWaterMeter } from '@/components/hooks/api-queries/useWaterMeter';
import { useOccupancy } from '@/components/hooks/api-mutations/useOccupancy';

const meterImage = require('../../assets/images/meter.png');
const sensor2 = require('../../assets/images/sensor2.jpg');

export function TempSwitch(props: SwitchToggleProps) {
  const [val, setVal] = useState(props.value || false);
  return <Switch value={val} onPress={() => setVal(!val)} />;
}

export const HomeScreen: FC<DemoTabScreenProps<'Home' | 'Calendar' | 'Comfort' | 'Settings'>> =
  function HomeScreen(_props) {
    const { themed } = useAppTheme();
    const { temp, setTemp, fetchTemp, tempLoading } = useTemperature();
    const { tempSetpoint, incrementTempSp, decrementTempSp, spLoading, fetchTempSp } =
      useTempSetpoint();
    const { dateTime, fetchDateTime, dateTimeLoading } = useDateTime();
    const { occupancy, changeOccupancy } = useOccupancy();
    const { btuData } = useBTUMeter();
    const { waterData } = useWaterMeter();

    const refreshAllData = useCallback(async () => {
      try {
        await Promise.all([fetchTemp(), fetchTempSp(), fetchDateTime()]);
      } catch (err) {
        console.error(`error fetching data ${err}`);
      }
    }, [fetchTemp, fetchTempSp, fetchDateTime]);

    const isLoading = tempLoading || spLoading || dateTimeLoading;

    useEffect(() => {
      refreshAllData();
      const interval = setInterval(refreshAllData, 6000000);
      return () => clearInterval(interval);
    }, [refreshAllData]);

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={['top']}>
        <Text preset="heading" size="md" text="ECY - STAT" style={themed($title)} />
        {isLoading ? (
          <ActivityIndicator size="large" style={$spinner} />
        ) : (
          <View>
            <ProfileCard
              iconType="user"
              size={50}
              txContent="Hello 👋"
              profileName="Fortis BC @ 1111 West Georgia St"
            />
            <Card
              heading={`${temp?.toFixed(2) ?? '--'}°C`}
              style={themed($temperatureCard)}
              headingStyle={themed($temperatureHeading)}
              contentTx="homeScreen:indoorTemp"
              contentStyle={themed($temperatureContent)}
              FooterComponent={
                <View style={$footerContainer}>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>🌥 32°C |</Text>
                  </View>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>💨 55% |</Text>
                  </View>
                  <View style={$footerItem}>
                    <Text style={themed($footerText)}>
                      {dateTime.date} 🕒 {dateTime.time}
                    </Text>
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
                    {tempSetpoint?.toFixed(1)}
                  </Text>
                </View>
                <View style={themed($controlsContainer)}>
                  <TouchableOpacity
                    onPress={() => decrementTempSp(0.5)}
                    style={themed($controlButton)}
                  >
                    <Text style={themed($buttonText)}>−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => incrementTempSp(0.5)}
                    style={themed($controlButton)}
                  >
                    <Text style={themed($buttonText)}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={themed($bottomContainer)}>
                <View style={themed($iconButtonContainer)}>
                  <TouchableOpacity
                    style={themed(occupancy === '7' ? $iconButtonSelected : $iconButton)}
                    onPress={() => changeOccupancy('7')}
                  >
                    <Icon icon="power" color="#374151" size={15} />
                  </TouchableOpacity>
                </View>
                <View
                  style={themed(occupancy === '1' ? $iconButtonSelected : $iconButtonContainer)}
                >
                  <TouchableOpacity
                    style={themed($iconButton)}
                    onPress={() => changeOccupancy('1')}
                  >
                    <Icon icon="a" color="#374151" size={15} />
                  </TouchableOpacity>
                </View>
                <View
                  style={themed(occupancy === '2' ? $iconButtonSelected : $iconButtonContainer)}
                >
                  <TouchableOpacity
                    style={themed($iconButton)}
                    onPress={() => changeOccupancy('2')}
                  >
                    <Icon icon="sun" color="#374151" size={15} />
                  </TouchableOpacity>
                </View>
                <View
                  style={themed(occupancy === '4' ? $iconButtonSelected : $iconButtonContainer)}
                >
                  <TouchableOpacity
                    style={themed($iconButton)}
                    onPress={() => changeOccupancy('4')}
                  >
                    <Icon icon="snow" size={15} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
            <DeviceCard imageSrc={meterImage} deviceName="Fortis BC Suite Meter">
              <View>
                <Text style={themed($label)}>Rate: {btuData.rate?.toString() ?? '0.0'}BTU/hr</Text>
                <Text style={themed($label)}>
                  Accum. Consumption: {btuData.accumulatedConsumption?.toFixed(2) ?? '--'} BTU
                </Text>
                <Text style={themed($label)}>
                  Monthly Cost: {btuData.monthlyCost?.toFixed(2) ?? '0.0'} CAD
                </Text>
                <Text style={themed($label)}>
                  DCW Meter Consumption: {btuData.accumulatedConsumption?.toFixed(1) ?? '--'}L
                </Text>
              </View>
            </DeviceCard>
            <DeviceCard imageSrc={sensor2} deviceName="Water Detector">
              <View>
                <Text style={themed($label)}>
                  Shutoff Valve Status:{' '}
                  <Text style={{ color: waterData?.valveStatus === 'active' ? 'green' : 'red' }}>
                    {waterData?.valveStatus}
                  </Text>
                </Text>
                <Text style={themed($label)}>
                  Water Detector Status:{' '}
                  <Text style={{ color: waterData?.detectorStatus === 'active' ? 'green' : 'red' }}>
                    {waterData?.detectorStatus}
                  </Text>
                </Text>
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

const $iconButtonSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 36,
  height: 36,
  borderRadius: 10,
  borderWidth: 1, // Keep border same or remove if desired
  borderColor: colors.palette.primary500, // Keep border color or match background
  backgroundColor: colors.palette.primary500, // Solid primary background
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
