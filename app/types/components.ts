import { ImageSourcePropType, ViewStyle, TextStyle } from 'react-native';
import { OccupancyMode } from './api';

export interface DeviceCardProps {
  imageSrc: ImageSourcePropType;
  deviceName: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface ProfileCardProps {
  iconType: string;
  size: number;
  txContent: string;
  profileName: string;
  style?: ViewStyle;
}

export interface OccupancyButtonProps {
  icon: string;
  label: string;
  value: OccupancyMode;
  currentValue: OccupancyMode;
  onPress: (mode: OccupancyMode) => void;
  style?: ViewStyle;
}

export interface WaterDetectorCardProps {
  status?: string;
  lastUpdated?: string;
  style?: ViewStyle;
}

export interface CardProps {
  heading?: string;
  headingStyle?: TextStyle;
  content?: string;
  contentStyle?: TextStyle;
  style?: ViewStyle;
  FooterComponent?: React.ReactNode;
}

export interface TextProps {
  text?: string;
  tx?: string;
  style?: TextStyle;
  preset?: 'default' | 'heading' | 'subheading' | 'body' | 'caption';
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
}
