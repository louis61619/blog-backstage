import request from './request'

export function getAdminInfo() {
  return request({
    url: "admin/getInfo"
  })
}

export function editAdminInfo(infoKey, value, id) {
  const obj = {}
  obj[infoKey] = value
  return request({
    method: "POST",
    url: "admin/editInfo",
    params: {
      id
    },
    data: {
      ...obj
    }
  })
}

export function uploadAvatar(data, userId) {
  // console.log(data, userId)
  return request({
    method: "POST",
    headers: {"content-type": "multipart/form-data"},
    url: "/admin/uploadAvatar",
    params: {
      userId
    },
    data,
  })
}

export function getVisitsStatistics() {
  return request({
    url: "/admin/getVisitsStatistics"
  })
}