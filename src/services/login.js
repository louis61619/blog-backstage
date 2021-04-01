import request from './request'

export function getLoginOpenId(name, password) {
  return request({
    method: "POST",
    url: "/admin/checkOpenId",
    data: {
      name,
      password
    }
  })
}

export function getIndex() {
  return request({
    url: "/admin/index",
  })
}