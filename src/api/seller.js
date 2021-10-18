import request from '@/utils/request'

export function getSellerData(params) {
  return request({
    url: '/seller',
    method: 'get',
    params: params
  })
}

export function getTrendData(params) {
  return request({
    url: '/trend',
    method: 'get',
    params: params
  })
}