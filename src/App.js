import React, { memo } from "react";
// import  {BrowserRouter} from 'react-router-dom'
import { renderRoutes } from "react-router-config";
import Immutable from 'immutable'
import { Provider} from "react-redux";
import configureStore from "@/store";

import routes from "@/router";

import AuthRouter from '@/components/auth-router'

const initialState = Immutable.Map()
const store = configureStore(initialState)

export default memo(function App() {

  return (
    <Provider store={store}>
      {/* <BrowserRouter>{renderRoutes(routes)}</BrowserRouter> */}
      {/* <ConnectedRouter history={history}>
      {renderRoutes(routes)}
      </ConnectedRouter> */}
      <AuthRouter>
      {renderRoutes(routes)}
      </AuthRouter>
    </Provider>
  );
});

