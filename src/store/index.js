import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import noteReducer from '../reducers/noteReducer';
import userReducer from '../reducers/userReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const reducer = combineReducers({
    notes: noteReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

const persistor = persistStore(store);

export {
    store,
    persistor,
};