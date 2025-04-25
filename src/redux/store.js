import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['count']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createStore = () => {
    const store = configureStore({
        reducer: persistedReducer
    });

    let persistor = persistStore(store)

    return { store, persistor };
}


// name: only character and space allowed, max 30, min 2
// age: positive and greater than zero
// address: maximum 100 word allowed
// bod: must be in past/current
// file: must be less or equal size of 2MB, and png and jpef only allowed
// country: dropdown must be select
// gender: radio button must be selected
// hobby: must be any 2 hobby select