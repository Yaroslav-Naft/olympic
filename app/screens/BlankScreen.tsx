import React, { FC, useState } from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { Screen, Switch, SwitchToggleProps } from '../components';
import { DemoTabScreenProps } from '../navigators/DemoNavigator';
import { $styles } from '../theme';

export function TempSwitch(props: SwitchToggleProps) {
  const [val, setVal] = useState(props.value || false);
  return <Switch value={val} onPress={() => setVal(!val)} />;
}

export const BlankScreen: FC<DemoTabScreenProps<'Home' | 'Calendar' | 'Comfort' | 'Settings'>> =
  function BlankScreen(_props) {
    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={['top']}>
        <ActivityIndicator size="large" style={$spinner} />
      </Screen>
    );
  };

const $spinner: ViewStyle = {
  marginVertical: 20,
};
