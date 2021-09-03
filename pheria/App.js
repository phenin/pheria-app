import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStackNavigation from './src/navigations';
import { persistor, store } from './src/store';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

function App() {

  const [token, setToken] = React.useState(null);

  const { getItem } = useAsyncStorage('accessToken');

  const readItemFromStorage = async () => {
    const item = await getItem();
    setToken(item);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RootStackNavigation />
			</PersistGate>
		</Provider>
  );
}

export default App;