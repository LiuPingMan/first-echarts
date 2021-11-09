import request from '@/utils/request'

export function getSellerData(params) {
  return request({
    url: '/api/seller',
    method: 'get',
    params: params
  })
}

export function getTrendData(params) {
  return request({
    url: '/api/trend',
    method: 'get',
    params: params
  })
}

export function getPositionData(params) {
  return request({
    url: '/api/map',
    method: 'get',
    params: params
  })
}

export function getRankData(params) {
  return request({
    url: '/api/rank',
    method: 'get',
    params: params
  })
}