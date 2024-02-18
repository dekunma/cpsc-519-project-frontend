import React from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

import Welcome from './screens/Welcome';

enableLatestRenderer();

function App() {
  return (
    <GluestackUIProvider config={config}>
      <Welcome />
    </GluestackUIProvider>
  );
}

export default App;
