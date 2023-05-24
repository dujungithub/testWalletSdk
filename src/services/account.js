import { request } from '@@/plugin-request';
import { getToken } from '@/utils/authority';

export async function loginByWallet(params) {
  return request(`${process.env.AuthApi}/auth/login`, {
    method: 'POST',
    data: params,
    headers: {
      Authorization: getToken() ? `Bearer ${getToken()}` : "",
    },
  });
}

export async function verifyByEmail(params) {
    return request(`${process.env.AuthApi}/auth/login/email`, {
      method: 'POST',
      data: params,
    });
}

export async function loginByEmail(params) {
    return request(`${process.env.AuthApi}/auth/email/verification`, {
      method: 'POST',
      data: params,
      headers: {
        Authorization: getToken() ? `Bearer ${getToken()}` : "",
      },
    });
}