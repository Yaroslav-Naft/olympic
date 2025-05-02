import { TextStyle, ViewStyle } from 'react-native';

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    card: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    palette: {
      neutral100: string;
      neutral200: string;
      neutral300: string;
      neutral400: string;
      neutral500: string;
      neutral600: string;
      neutral700: string;
      neutral800: string;
      neutral900: string;
      overlay50: string;
    };
  };
  spacing: {
    xs: number;
    small: number;
    medium: number;
    large: number;
    xl: number;
  };
  typography: {
    heading: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
}

export type ThemedStyle<T> = (theme: AppTheme) => T;

export interface HomeScreenStyles {
  container: ViewStyle;
  temperatureCard: ViewStyle;
  temperatureHeading: TextStyle;
  temperatureContent: TextStyle;
  footerContainer: ViewStyle;
  footerItem: ViewStyle;
  footerText: TextStyle;
  tempSetpointContainer: ViewStyle;
  setpointValueContainer: ViewStyle;
  setpointValueText: TextStyle;
  controlsContainer: ViewStyle;
  controlButton: ViewStyle;
  buttonText: TextStyle;
  title: TextStyle;
  contentContainer: ViewStyle;
  bottomContainer: ViewStyle;
  label: TextStyle;
}
