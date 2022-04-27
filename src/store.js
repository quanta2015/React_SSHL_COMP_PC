// redux store config
// @author Pluto <huarse@gmail.com>
// @create 2020/06/03 00:44

import { createStore, combineReducers } from 'redux';
import rootReducer from './reducers';

export default function configStore() {
  const store = createStore(
    combineReducers({
      ...rootReducer,
    }),
    // applyMiddleware(),
  );
  return store;
}
