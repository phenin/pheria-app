import * as React from 'react';
import {NativeBaseProvider, Box, extendTheme, ScrollView} from 'native-base';
import Story from '../components/story/story';
import {getListStory} from '../store/actions/storyActions';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {RefreshControl} from 'react-native';
import NativeAdView from "react-native-admob-native-ads";
import {vw, vh} from '../plugins/viewport-unit';
import { ImageView } from "react-native-admob-native-ads";

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ListStoryScreen({navigation}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    dispatch(getListStory());
  }, [dispatch, getListStory]);

  const theme = extendTheme({
    components: {},
  });

  const nativeAdViewRef = React.useRef();

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="#000" style={{paddingTop: 10, paddingBottom: 10}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <NativeAdView adUnitID={'ca-app-pub-9563737084866671/7298500668'}
              enableTestMode={true} ref={nativeAdViewRef}
              requestNonPersonalizedAdsOnly={true}>
              <Box bg="#1d232c"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  width: 80 * vw,
                  marginRight: 10 * vw,
                  marginLeft: 10 * vw,
                  marginTop: 4 * vw,
                  marginBottom: 4 * vw,
                  borderRadius: 30,
                  height: 40 * vh,
                }}>
                  <ImageView
                    style={{
                      width: "100%",
                    }}
                  />
              </Box>
            </NativeAdView>
          <Box style={{flex: 1}} style={{marginTop: 30, marginBottom: 30}}>
            {state.listStory.map((item, index) => {
              return <Story data={item} key={index} navigation={navigation} />;
            })}
            
          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}

function stateSelector(state) {
  return {
    listStory: state.listStory.listStory,
  };
}

export default ListStoryScreen;
