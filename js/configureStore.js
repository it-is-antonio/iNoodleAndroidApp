
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

export default function configureStore(onCompletion:()=>void):any {
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    autoRehydrate()
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);
  store.subscribe(() => {
      console.info(store.getState().user);
      console.info(store.getState().noodleboard);
      console.info(store.getState().noodleDetails);
      
  })

  return store;
}
