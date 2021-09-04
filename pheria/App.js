import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootStackNavigation from './src/navigations';
import { persistor, store } from './src/store';

function App() {

  const myUsername = store.getState().user.user?.userInfo?.name
  
  const ref = useRef({
		itv: setInterval(() => { }, 3000)
	})
  useEffect(() => {
    if (myUsername) {
			ref.current.itv = setInterval(() => {
				if (AppState.currentState === 'active') {
					// database().ref(`/online/${convertToFirebaseDatabasePathName(myUsername)}`)
					// 	.update({
					// 		last_online: new Date().getTime(),
					// 		status: 1
					// 	})
				}
			}, 60000)
		}
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