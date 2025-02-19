import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Redux/Counter/counterSlice";
import userReducer from "./Redux/User/userSlice";
import cartReducer from "./Redux/Cart/cartSlice";
import raffleReducer from "./Redux/Raffle/raffleSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  cart: cartReducer,
  raffle: raffleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
