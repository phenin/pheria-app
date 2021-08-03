import * as React from 'react';
import {
  Box
} from 'native-base';
import { useSelector, shallowEqual } from 'react-redux'

function DetailStoryScreen({route}) {

  const state = useSelector(stateSelector, shallowEqual)

  return (
    <Box>
      abc
    </Box>
  );
}

function stateSelector(state) {
  return {
    story: state.story.story,
  }
}

export default DetailStoryScreen;
