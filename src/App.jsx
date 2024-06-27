import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainRoutes from './routes/MainRoutes';
import { DatabaseProvider } from './context/DatabaseContext';

const App = () => {
  return (
    <DatabaseProvider>
      <SafeAreaView className='flex-1'>
        <MainRoutes />
      </SafeAreaView>
    </DatabaseProvider>
  )
}

export default App
