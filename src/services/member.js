import request from './request'

export function getMemberList(offset, size) {
  return request({
    url: "/admin/getMemberList",
    params: {
      offset,
      size
    }
  })
}

export function addBlock(blockStatus, userId) {
  return request({
    method: "PATCH",
    url: "/admin/addBlock",
    data: {
      blockStatus, 
      userId
    }
  })
}