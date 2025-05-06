import { useAppTheme } from '@/utils/useAppTheme';
import { useTranslation } from 'react-i18next';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useWaterMeter, DefaultDeviceState } from './hooks/api-queries/useWaterMeter';
import { ThemedStyle } from '@/theme';
import { Text } from '@/components';

export const WaterDetectorCard = () => {
  const { t } = useTranslation();
  const { themed } = useAppTheme();
  const { waterData } = useWaterMeter();

  const valveColor =
    waterData?.valveStatus === DefaultDeviceState.Active ? Colors.RED : Colors.GREEN;
  const detectorColor =
    waterData?.detectorStatus === DefaultDeviceState.Active ? Colors.RED : Colors.GREEN;

  return (
    <View style={$valveDetectorContainer}>
      <View style={$valveContainer}>
        <Text style={themed($label)}>
          {t('waterDetector:valveStatus:title')}{' '}
          <Text style={{ color: valveColor }}>
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
          <Text style={{ color: detectorColor }}>
            {t(
              waterData?.detectorStatus === DefaultDeviceState.Active
                ? 'waterDetector:detectorStatus:leak'
                : 'waterDetector:detectorStatus:noLeak',
            )}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const $valveDetectorContainer: ViewStyle = {};

const $valveContainer: ViewStyle = {
  flexDirection: 'column',
};

const $detectorContainer: ViewStyle = {
  flexDirection: 'row',
  paddingTop: 5,
};

const $label: ThemedStyle<TextStyle> = () => ({
  fontSize: 14,
  color: '#6b7280',
  marginBottom: 8,
});
