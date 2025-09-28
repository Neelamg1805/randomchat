import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authentication';
import userSlice from './slices/user';
import socketSlice from './slices/socketSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        socket: socketSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),

});
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch