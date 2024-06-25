import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import categoryReducer from './category/categorySlice'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

export const persistedReducer = persistReducer(persistConfig, categoryReducer);


export const store = configureStore({
    reducer: {
        categories: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
