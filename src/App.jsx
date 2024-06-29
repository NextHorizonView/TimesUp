import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainRoutes from './routes/MainRoutes';
import { DatabaseProvider } from './context/DatabaseContext';
import notifee, { EventType } from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    return notifee.onForegroundEvent(() => { });
  }, []);

  return (
    <DatabaseProvider>
      <SafeAreaView className='flex-1'>
        <MainRoutes />
      </SafeAreaView>
    </DatabaseProvider>
  )
}

export default App
