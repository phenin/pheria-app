import * as React from 'react';
import {NativeBaseProvider, Box, extendTheme, ScrollView} from 'native-base';
import Story from '../components/story/story';
import {getListStory} from '../store/actions/storyActions';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {RefreshControl} from 'react-native';

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

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1} bg="#000" style={{paddingTop: 10, paddingBottom: 10}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
