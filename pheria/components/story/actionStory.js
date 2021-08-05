import * as React from 'react';
import {Flex} from 'native-base';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';

export default function ActionStory({navigation, color}) {
  const state = useSelector(stateSelector, shallowEqual);
  const dispatch = useDispatch();

  return (
    <Flex height={30} direction={'column'} justify="space-between">
      
    </Flex>
  );
}

function stateSelector(state) {
  return {
    title: state.story.title,
  };
}
