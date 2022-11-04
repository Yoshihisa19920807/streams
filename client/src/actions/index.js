import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  UPDATE_STREAM,
} from "./types";

export const signIn = (userId) => {
  // bindActionCreators is automatically called
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = (formValues) => async (dispatch, getState) => {
  console.log(formValues)
  const { userId } = getState().auth
  const response = await streams.post('/streams', { ...formValues, userId });
  await dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');
  console.log("fetchStreams")
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  // payloadの入り先はstreamReducerで定義されている通りstreams
  dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const updateStream = (id, formValues) => async (dispatch) => {
  console.log(formValues)
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({ type: UPDATE_STREAM, payload: response.data });
}

export const deleteStream = (id) => async (dispatch) => {
  // const response = await streams.delete(`/streams/${id}`);
  // dispatch( { type: DELETE_STREAM, payload: response.data })
  await streams.delete(`/streams/${id}`);
  dispatch( { type: DELETE_STREAM, payload: id })
}
