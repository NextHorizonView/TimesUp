import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import MainRoutes from './routes/MainRoutes';
import { DatabaseProvider } from './context/DatabaseContext';
import notifee, { EventType } from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    return notifee.onForegroundEvent(() => { });
  }, []);

  return (
    <SafeAreaProvider>
      <DatabaseProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <MainRoutes />
        </SafeAreaView>
      </DatabaseProvider>
    </SafeAreaProvider>
  )
}

export default App
