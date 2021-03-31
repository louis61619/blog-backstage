// import { combineReducers } from 'redux-immutable'
// import { combineReducers } from 'redux'
// import { connectRouter } from 'connected-react-router'


// const cReducer = (history) => combineReducers({
//   router: connectRouter(history),
// })

// export default cReducer

import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'

import { reducer as adminReducer } from "./admin"

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  admin: adminReducer
})

export default rootReducer