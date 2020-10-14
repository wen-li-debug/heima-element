import request from './request'

// 获取表格数据
export function getArticle (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取文章频道
export function getArticleChannels () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
