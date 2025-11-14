import React from 'react';
import { StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { themeStore } from './src/stores';
import AppNavigator from './src/navigation/AppNavigator';

const App = observer(() => {
  const { isDark, colors } = themeStore;

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <AppNavigator />
    </>
  );
});

export default App;
