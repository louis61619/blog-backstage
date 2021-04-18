import request from './request'

export function getArticleList(offset, size) {
  return request({
    url: "/admin/getArticleList",
    params: {
      offset,
      size
    }
  })
}

export function deleteContent(id) {
  return request({
    method: 'delete',
    url: "/admin/deleteContent/" + id,
  })
}

export function searchArticleList(offset, size, keyword) {
  return request({
    url: "/admin/searchArticleList",
    params: {
      offset,
      size,
      keyword
    }
  })
}