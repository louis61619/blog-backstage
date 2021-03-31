import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  adminInfo: {}
})

function reducer(state=defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_ADMIN_INFO:
      
      return state.set("adminInfo", action.info)
    default:
      return state
  }
}

export default reducer;