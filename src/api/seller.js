import request from '@/utils/request'

export function getSellerData(params) {
  return request({
    url: '/seller',
    method: 'get',
    params: params
  })
}