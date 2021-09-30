import request from '../utils/request'

export function getMap(url,params) {
  return request({
    method: 'get',
    url,
    params
  })
}