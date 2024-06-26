import 'react-native-gesture-handler';
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainRoutes from './routes/MainRoutes';
import { DatabaseProvider } from './context/DatabaseContext';

const App = () => {
  return (
    <DatabaseProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView className='flex-1'>
            <MainRoutes />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </DatabaseProvider>
  )
}

export default App
