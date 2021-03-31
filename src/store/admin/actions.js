import * as actionTypes from './constants'

import { getAdminInfo, editAdminInfo } from "@/services/workbanch";

const changeAdminInfoAction = info => ({
  type: actionTypes.CHANGE_ADMIN_INFO,
  info
})

export const changeAdminDetailAction = (params) => {
  return async (dispatch, getState) => {
    const [infoKey, value] = params
    const { ...adminInfo } = getState().getIn(["admin", "adminInfo"])
    adminInfo[infoKey] = value
    dispatch(changeAdminInfoAction(adminInfo))

    // 調用某個函數
    const res = await editAdminInfo(infoKey, value, adminInfo.userId)
    console.log(res)
  }
}

export const getAdminInfoAction = () => {
  return async dispatch => {
    const res = await getAdminInfo()
    dispatch(changeAdminInfoAction(res))
  }
}