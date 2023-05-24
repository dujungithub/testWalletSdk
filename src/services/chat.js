import { request } from '@@/plugin-request';
export async function chatByStart(tokenId) {
    return request(`${process.env.ChatApi}/chat/${tokenId}/start`, {
      method: 'GET'
    });
}

export async function chatByAnswers(params,tokenId) {
    return request(`${process.env.ChatApi}/chat/${tokenId}/answers`, {
      method: 'POST',
      data: params,
    });
}

export async function chatByStop(tokenId) {
    return request(`${process.env.ChatApi}/chat/${tokenId}/stop`, {
      method: 'GET'
    });
}