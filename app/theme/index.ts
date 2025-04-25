import type { StyleProp } from 'react-native';
import { colors as colorsLight } from './colors';
import { colors as colorsDark } from './colorsDark';
import { spacing as spacingLight } from './spacing';
import { spacing as spacingDark } from './spacingDark';
import { timing } from './timing';
import { typography } from './typography';

// This supports "light" and "dark" themes by default. If undefined, it'll use the system theme
/**
 * Represents the possible theme contexts for the application.
 * @type {"light" | "dark" | undefined}
 */
export type ThemeContexts = 'light' | 'dark' | undefined;

// Because we have two themes, we need to define the types for each of them.
/**
 * Represents the color palette for a theme.
 * Can be either the light or dark color scheme.
 */
export type Colors = typeof colorsLight | typeof colorsDark;
// The spacing type needs to take into account the different spacing values for light and dark themes.
/**
 * Represents the spacing values for a theme.
 * Can be either the light or dark spacing scheme.
 */
export type Spacing = typeof spacingLight | typeof spacingDark;

// These two are consistent across themes.
/**
 * Represents the timing values used for animations.
 * These are consistent across themes.
 */
export type Timing = typeof timing;
/**
 * Represents the typography settings.
 * These are consistent across themes.
 */
export type Typography = typeof typography;

// The overall Theme object should contain all of the data you need to style your app.
export interface Theme {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  timing: Timing;
  isDark: boolean;
}

// Here we define our themes.
export const lightTheme: Theme = {
  colors: colorsLight,
  spacing: spacingLight,
  typography,
  timing,
  isDark: false,
};
export const darkTheme: Theme = {
  colors: colorsDark,
  spacing: spacingDark,
  typography,
  timing,
  isDark: true,
};

/**
 * Represents a function that returns a styled component based on the provided theme.
 * @template T The type of the style.
 * @param theme The theme object.
 * @returns The styled component.
 *
 * @example
 * const $container: ThemedStyle<ViewStyle> = (theme) => ({
 *   flex: 1,
 *   backgroundColor: theme.colors.background,
 *   justifyContent: "center",
 *   alignItems: "center",
 * })
 * // Then use in a component like so:
 * const Component = () => {
 *   const { themed } = useAppTheme()
 *   return <View style={themed($container)} />
 * }
 */
export type ThemedStyle<T> = (theme: Theme) => T;
/**
 * Represents an array of themed styles that can be either direct styles,
 * themed style functions, or nested arrays of either.
 * @template T The type of the style.
 */
export type ThemedStyleArray<T> = (
  | ThemedStyle<T>
  | StyleProp<T>
  | (StyleProp<T> | ThemedStyle<T>)[]
)[];

// Export the theme objects with backwards compatibility for the old theme structure.
export { colorsLight as colors };
export { colorsDark };
export { spacingLight as spacing };

export * from './styles';
export * from './typography';
export * from './timing';
