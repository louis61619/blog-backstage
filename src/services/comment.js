import request from './request'

export function getComment(offset, size) {
  return request({
    method: "GET",
    url: "/admin/comment",
    params: {
      offset,
      size
    }
  })
}

export function replyComment(commentId, articleId, content, id) {
  return request({
    method: "POST",
    url: "/admin/reply/" + commentId,
    data: {
      articleId,
      content,
      id
    }
  })
}

export function modifyComment(content, commentId) {
  return request({
    method: "PATCH",
    url: "/admin/modifyComment/" + commentId,
    data: {
      content
    },
  })
}

export function deleteComment(id) {
  return request({
    method: "DELETE",
    url: "/admin/deleteComment/" + id,
  })
}