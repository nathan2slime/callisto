import React from 'react';
import themes from '@cars/themes';
import { SafeAreaView, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UIThemeProvider } from '@cars/ui';
import { ModalPortal } from 'react-native-modals';
import styled, { ThemeProvider } from 'styled-components/native';

import { persistor, store } from './src/store';
import Routes from './src/routes';

const App = () => {
  const theme = themes[useColorScheme() || 'dark'];

  return (
    <ThemeProvider theme={theme}>
      <UIThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<LoadingWrapper />} persistor={persistor}>
            <Routes theme={theme} />

            <ModalPortal />
          </PersistGate>
        </Provider>
      </UIThemeProvider>
    </ThemeProvider>
  );
};

export default App;

const LoadingWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
`;
