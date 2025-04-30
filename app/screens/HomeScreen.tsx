import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Card, Icon, Screen, Switch, SwitchToggleProps, Text } from '@/components';
import { DemoTabScreenProps } from '@/navigators/DemoNavigator';
import { $styles } from '@/theme';
import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { ProfileCard } from '@/components/ProfileCard';
import { DeviceCard } from '@/components/DeviceCard';
import { useDateTime } from '@/components/hooks/api-queries/useDateTime';
import { useTemperature } from '@/components/hooks/api-queries/useTemperature';
import { useTempSetpoint } from '@/components/hooks/api-mutations/useTempSetpoint';
import { useBTUMeter } from '@/components/hooks/api-queries/useBTUMeter';
import { DefaultDeviceState, useWaterMeter } from '@/components/hooks/api-queries/useWaterMeter';
import { useOccupancy } from '@/components/hooks/api-mutations/useOccupancy';
import { useWeather } from '@/components/hooks/api-queries/useWeather';
import { useHumidity } from '@/components/hooks/api-queries/useHumidity';
import { useTranslation } from 'react-i18next';
import { useRefreshAllData } from '@/components/hooks/api-queries/useRefreshAllData';
import { OccupancyButton } from '@/components/OccupancyButton';

const meterImage = require('../../assets/images/meter.png');
const sensor2 = require('../../assets/images/sensor2.jpg');

export function TempSwitch(props: SwitchToggleProps) {
  const [val, setVal] = useState(props.value || false);
  return <Switch value={val} onPress={() => setVal(!val)} />;
}

enum Colors {
  GREEN = 'green',
  RED = 'red',
}

enum OCCUPANCY_MODE {
  OFF = '7',
  AUTO = '1',
  HEAT = '2',
  COOL = '4',
}

type DemoTabs = 'Home' | 'Calendar' | 'Comfort' | 'Settings';

export const HomeScreen: FC<DemoTabScreenProps<DemoTabs>> = function HomeScreen(_props) {
  const { t } = useTranslation();

  const { themed } = useAppTheme();
  const { temp, tempLoading } = useTemperature();
  const { humidity, humidityLoading } = useHumidity();
  const { tempSetpoint, incrementTempSp, decrementTempSp, spLoading } = useTempSetpoint();
  const { dateTime, dateTimeLoading } = useDateTime();
  const { occupancy, changeOccupancy } = useOccupancy();
  const { btuData } = useBTUMeter();
  const { waterData } = useWaterMeter();
  const { weather } = useWeather();

  const refreshAllData = useRefreshAllData();

  const isLoading = tempLoading || spLoading || dateTimeLoading || humidityLoading;

  //Todo: Think about how to abstract this in best practices
  //Device Card Renderer abstraction
  const devicesArray = [
    {
      image: meterImage,
      name: 'Fortis BC Suite Meter',
      values: [
        {
          label: 'meter:rate',
          value: btuData.rate?.toFixed(1) ?? 0.0,
        },
        {
          label: 'meter:AccumulatedConsumption',
          value: btuData.accumulatedConsumption?.toFixed(1) ?? 0.0,
        },
        {
          label: 'meter:monthlyCost',
          value: btuData.monthlyCost?.toFixed(1) ?? 0.0,
        },
        {
          label: 'meter:waterConsumption',
          value: btuData.accumulatedConsumption?.toFixed(1) ?? 0.0,
        },
      ],
    },
  ];

  //TODO: Change to Socket.io in the future based on Github ticket
  useEffect(() => {
    refreshAllData();
    const interval = setInterval(refreshAllData, 6000000);
    return () => clearInterval(interval);
  }, [refreshAllData]);

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={['top']}>
      <Text preset="heading" size="md" text={t('title')} style={themed($title)} />
      {isLoading ? (
        <ActivityIndicator size="large" style={$spinner} />
      ) : (
        <View>
          <ProfileCard
            iconType="user"
            size={50}
            txContent={t('profile:greeting')}
            profileName={t('profile:location')}
          />
          <Card
            heading={`${temp?.toFixed(2) ?? '--'}°C`}
            style={themed($temperatureCard)}
            headingStyle={themed($temperatureHeading)}
            content={t('temperature:indoorTemp')}
            contentStyle={themed($temperatureContent)}
            FooterComponent={
              <View style={$footerContainer}>
                <View style={$footerItem}>
                  <Text style={themed($footerText)}>
                    {t('temperature:outdoorTemp', {
                      temp: weather?.outdoorAirTemp ?? '--',
                    })}
                    |{' '}
                  </Text>
                </View>
                <View style={$footerItem}>
                  <Text style={themed($footerText)}>
                    {t('temperature:humidity', {
                      humidity: humidity?.toFixed(1) ?? '--',
                    })}
                    |{' '}
                  </Text>
                </View>
                <View style={$footerItem}>
                  <Text style={themed($footerText)}>
                    {t('temperature:date', { date: dateTime.date })}
                  </Text>
                </View>
              </View>
            }
          />
          <Card style={[themed($temperatureCard)]}>
            <View style={themed($tempSetpointContainer)}>
              <Text style={themed($label)}>{t('temperature:setpoint:title')}</Text>
            </View>
            <View style={themed($contentContainer)}>
              <View style={themed($setpointValueContainer)}>
                <Text style={themed($setpointValueText)}>{tempSetpoint?.toFixed(1)}</Text>
              </View>
              <View style={themed($controlsContainer)}>
                <TouchableOpacity
                  onPress={() => decrementTempSp(0.5)}
                  style={themed($controlButton)}
                >
                  <Text style={themed($buttonText)}>
                    {t('temperature:setpoint:controls:decrease')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => incrementTempSp(0.5)}
                  style={themed($controlButton)}
                >
                  <Text style={themed($buttonText)}>
                    {t('temperature:setpoint:controls:increase')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={themed($bottomContainer)}>
              <OccupancyButton
                icon={'power'}
                label={t('temperature:modes:off')}
                value={OCCUPANCY_MODE.OFF}
                currentValue={occupancy!}
                onPress={() => changeOccupancy(OCCUPANCY_MODE.OFF)}
              />
              <OccupancyButton
                icon={'a'}
                label={t('temperature:modes:auto')}
                value={OCCUPANCY_MODE.AUTO}
                currentValue={occupancy!}
                onPress={() => changeOccupancy(OCCUPANCY_MODE.AUTO)}
              />
              <OccupancyButton
                icon={'sun'}
                label={t('temperature:modes:heat')}
                value={OCCUPANCY_MODE.HEAT}
                currentValue={occupancy!}
                onPress={() => changeOccupancy(OCCUPANCY_MODE.HEAT)}
              />
              <OccupancyButton
                icon={'snow'}
                label={t('temperature:modes:cool')}
                value={OCCUPANCY_MODE.COOL}
                currentValue={occupancy!}
                onPress={() => changeOccupancy(OCCUPANCY_MODE.COOL)}
              />
            </View>
          </Card>

          <DeviceCard imageSrc={meterImage} deviceName="Fortis BC Suite Meter">
            <View>
              <Text style={themed($label)}>
                {t('meter:rate', { rate: btuData.rate?.toString() ?? '0.0' })}
              </Text>
              <Text style={themed($label)}>
                {t('meter:accumulatedConsumption', {
                  consumption: btuData.accumulatedConsumption?.toFixed(1) ?? '--',
                })}
              </Text>
              <Text style={themed($label)}>
                {t('meter:monthlyCost', {
                  cost: btuData.monthlyCost?.toFixed(2) ?? '0.0',
                })}
              </Text>
              <Text style={themed($label)}>
                {t('meter:waterConsumption', {
                  consumption: btuData.accumulatedConsumption?.toFixed(1) ?? '--',
                })}
              </Text>
            </View>
          </DeviceCard>
          <DeviceCard imageSrc={sensor2} deviceName="Water Detector">
            <View style={$valveDetectorContainer}>
              <View style={$valveContainer}>
                <Text style={themed($label)}>
                  {t('waterDetector:valveStatus:title')}{' '}
                  <Text
                    style={{
                      color:
                        waterData?.valveStatus === DefaultDeviceState.Active
                          ? Colors.RED
                          : Colors.GREEN,
                    }}
                  >
                    {t(
                      waterData?.valveStatus === DefaultDeviceState.Active
                        ? 'waterDetector:valveStatus:closed'
                        : 'waterDetector:valveStatus:open',
                    )}
                  </Text>
                </Text>
              </View>
              <View style={$detectorContainer}>
                <Text style={themed($label)}>
                  {t('waterDetector:detectorStatus:title')}{' '}
                  <Text
                    style={{
                      color:
                        waterData?.detectorStatus === DefaultDeviceState.Active
                          ? Colors.RED
                          : Colors.GREEN,
                    }}
                  >
                    {t(
                      waterData?.detectorStatus === DefaultDeviceState.Active
                        ? 'waterDetector:detectorStatus:leak'
                        : 'waterDetector:detectorStatus:noLeak',
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          </DeviceCard>
        </View>
      )}
    </Screen>
  );
};

const $tempSetpointContainer: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 16,
});

const $setpointValueContainer: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: 'transparent',
  overflow: 'visible',
});

const $setpointValueText: ThemedStyle<TextStyle> = () => ({
  fontSize: 40,
  fontWeight: 'bold',
  fontFamily: 'System',
  color: '#374151',
  lineHeight: 48,
  includeFontPadding: false,
  textAlignVertical: 'center',
  backgroundColor: 'transparent',
  paddingTop: 0,
});

const $iconButtonRow: ViewStyle = {
  flexDirection: 'row',
};

const $iconContainer: ViewStyle = {
  paddingTop: 3,
  paddingRight: 2,
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
  alignItems: 'center',
};

const $valveDetectorContainer: ViewStyle = {};

const $valveContainer: ViewStyle = {
  flexDirection: 'column',
};

const $detectorContainer: ViewStyle = {
  flexDirection: 'row',
  paddingTop: 5,
};

const $footerItem: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $footerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 14,
  color: colors.textDim,
});

const $controlsContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  position: 'absolute',
  verticalAlign: 'center',
  right: 0,
  top: 0,
  gap: 12,
});

const $controlButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 45,
  height: 45,
  borderRadius: 8,
  borderWidth: 1,
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

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 22,
  color: colors.palette.neutral800,
  textAlign: 'center',
  fontWeight: '200',
  includeFontPadding: false,
  lineHeight: 22,
  fontFamily: 'System',
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  fontFamily: 'System',
});

const $spinner: ViewStyle = {
  marginVertical: 20,
};

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
});

const $bottomContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const $label: ThemedStyle<TextStyle> = () => ({
  fontSize: 14,
  color: '#6b7280',
  marginBottom: 8,
});
