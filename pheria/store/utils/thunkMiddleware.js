// Archived: use with self-config store (not redux store)
function createThunkMiddleware(extraArgument) {
  return ({
    dispatch,
    getState,
    updateImmediatelyState
  }) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    dispatch(action);
    updateImmediatelyState(action.payload);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;