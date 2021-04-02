import request from './request'

export function getLabelInfo() {
  return request({
    url: "/admin/getLabelInfo",
  })
}

export function addContent(title, introduce, articleContent, releaseTime, viewCount=0, likeCount=0) {
  return request({
    method: "POST",
    url: "/admin/addContent",
    data: {
      title,
      introduce,
      article_content: articleContent,
      release_time: releaseTime,
      view_count: viewCount,
      like_count: likeCount,
    }
  })
}

export function updateContent(id, title, introduce, articleContent, releaseTime) {
  return request({
    method: "POST",
    url: "/admin/updateContent",
    data: {
      id,
      title,
      introduce,
      article_content: articleContent,
      release_time: releaseTime
    }
  })
}

export function getArticleById(id) {
  return request({
    method: "GET",
    url: "/admin/getArticleById/" + id,
  })
}

export function addLable(label) {
  return request({
    method: "POST",
    url: "/admin/addLabel",
    data: label
  })
}

export function setArticleLabels(id, labels) {
  return request({
    method: "POST",
    url: `/admin/${id}/labels`,
    data: labels
  })
}

export function uploadPicture(data, onUploadProgress, id) {
  return request({
    method: "POST",
    headers: {"content-type": "multipart/form-data"},
    url: "/admin/upload",
    params: {
      id
    },
    data,
  })
}