import request from './request'

// 将文本base64图片转化成链接图片
export function upLoadImg (data) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的要求请求头中 Centent-Type 设置为 multipart.form-data
    data
  })
}

// 获取图片
export function getImage (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏/取消收藏切换
export function collectImages (collectId, data) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${collectId}`,
    data
  })
}

// 删除素材
export function deleImages (imageId) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
