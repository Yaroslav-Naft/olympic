import { NavigationProp, RouteProp, NavigatorScreenParams } from '@react-navigation/native';

export type DemoTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Comfort: undefined;
  Settings: undefined;
};

export type DemoTabScreenProps<T extends keyof DemoTabParamList> = {
  navigation: NavigationProp<DemoTabParamList, T>;
  route: RouteProp<DemoTabParamList, T>;
};

export type AppStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Demo: NavigatorScreenParams<DemoTabParamList>;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = {
  navigation: NavigationProp<AppStackParamList, T>;
  route: RouteProp<AppStackParamList, T>;
};
