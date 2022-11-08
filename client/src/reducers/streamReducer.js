import _ from 'lodash';

import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  UPDATE_STREAM,
  DELETE_STREAM
} from "../actions/types";

const streamReducer = (state=[], action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case FETCH_STREAMS:
      // idという文字列ではなくaction.payload内の要素それぞれのキー"id"に格納されているバリューがキーとして返ってくる
      // ... は値を繰り返し展開してくれる
      //　_.keyMaps(action.payload, 'id')は返り値であるオブジェクトを展開して...stateに渡してくれる
      return {...state, ..._.mapKeys(action.payload, 'id')}
    case FETCH_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case UPDATE_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case DELETE_STREAM:
      return _.omit(state, action.payload.id);
    default:
      return state;
  };
};

export default streamReducer;
