import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import { watchFetchGeez } from "./Middleware/Middleware";
// const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: {
  },
//   middleware: [sagaMiddleware],
});

// sagaMiddleware.run(watchFetchGeez);

export default Store;
