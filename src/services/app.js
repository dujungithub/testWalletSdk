import { request } from '@@/plugin-request';

export async function getHomeInfo() {
  return request(`/home-api/`, {
    method: 'GET'
  });
}
