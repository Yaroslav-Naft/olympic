import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { TextStyle, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../components';
import type { ThemedStyle } from '@/theme';
import { AppStackParamList, AppStackScreenProps } from './AppNavigator';
import { useAppTheme } from '@/utils/useAppTheme';
import { HomeScreen } from '@/screens/HomeScreen';
import { BlankScreen } from '@/screens/BlankScreen';

export type DemoTabParamList = {
  DemoCommunity: undefined;
  Home: undefined;
  Calendar: undefined;
  Comfort: undefined;
  Settings: undefined;
  DemoShowroom: { queryIndex?: string; itemIndex?: string };
  DemoPodcastList: undefined;
  DemoDebug: undefined;
};

export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;

const Tab = createBottomTabNavigator<DemoTabParamList>();

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets();
  const {
    themed,
    theme: { colors },
  } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarItemStyle: themed($tabBarItem),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={BlankScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="calendar" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Comfort"
        component={BlankScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="list" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={BlankScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="setting" color={focused ? 'white' : colors.tintInactive} size={30} />
          ),
        }}
      />

      {/* NOTE: Keep this tab for troubleshooting */}
      {/* <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator:debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
});

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
});

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
});
