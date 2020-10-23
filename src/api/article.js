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

/**
 * 删除文章
 */

export function getDelArticle (articleId) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/**
 * 发表文章
 */

export function addArticle (data, draft = false) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

/**
 * 获取修改文章信息
 */

export function getUpdaArticle (articleId) {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/**
 * 修改文章
 */

export function updaArticle (articleId, data, draft = false) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

/**
 * 修改评论管理状态
 */
export function updaCommentStatus (articleId, allowComment) {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    query: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
