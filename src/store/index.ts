import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import authSlice from "./slices/authSlice";
import assetSlice from "./slices/assetSlice";
import uiSlice from "./slices/uiSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  auth: authSlice,
  asset: assetSlice,
  ui: uiSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth slice (you can add more)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     asset: assetSlice,
//     ui: uiSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== "production",
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: true, // to be false on deployment
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
