import { request } from 'umi';
import { getToken } from '@/utils/authority';

export async function getTaskList( params) {
  return request(
    `${process.env.TasksApi}/tasks`,
    {
      method: 'get',
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNmYyYjM4YmE3ZDczMGVmMzI5NjZhZTFlNmNiZmNhNjViNWRjOTZkIiwiaWF0IjoxNjgxMjYzMTQyLCJleHAiOjE2ODEzNDk1NDJ9.9PApL0QRGz8l02-Yy34U_GQC1KwVxPhIsBY3t55Ur3g"
      },
    },
  );
}

export async function getSNSStatus( params) {
  return request(
    `${process.env.Api}/api/steam/personas/job`,
    {
      method: 'get',
      params: {
        ...params,
      },
      headers: {
        "x-token": `${getToken()}`,
        // "x-token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNmYyYjM4YmE3ZDczMGVmMzI5NjZhZTFlNmNiZmNhNjViNWRjOTZkIiwiaWF0IjoxNjgxMjYzMTQyLCJleHAiOjE2ODEzNDk1NDJ9.9PApL0QRGz8l02-Yy34U_GQC1KwVxPhIsBY3t55Ur3g"
      },
    },
  );
}


export async function submitTask( params) {
  return request(
    `${process.env.TasksApi}/tasks/${params.id}/submission`,
    {
      method: 'post',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNmYyYjM4YmE3ZDczMGVmMzI5NjZhZTFlNmNiZmNhNjViNWRjOTZkIiwiaWF0IjoxNjgxMjYzMTQyLCJleHAiOjE2ODEzNDk1NDJ9.9PApL0QRGz8l02-Yy34U_GQC1KwVxPhIsBY3t55Ur3g"
      },
    },
  );
}

export async function createPoster() {
  return request(
    `${process.env.Api}/api/steam/personas/job`,
    {
      method: 'post',
      headers: {
        "x-token": `${getToken()}`,
        // "x-token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNmYyYjM4YmE3ZDczMGVmMzI5NjZhZTFlNmNiZmNhNjViNWRjOTZkIiwiaWF0IjoxNjgxMjYzMTQyLCJleHAiOjE2ODEzNDk1NDJ9.9PApL0QRGz8l02-Yy34U_GQC1KwVxPhIsBY3t55Ur3g"
      },
    },
  );
}


export async function getSNSDetail( params) {
  return request(
    `${process.env.TasksApi}/tasks/steam-personas`,
    {
      method: 'get',
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // "x-token": `${getToken()}`,
      },
    },
  );
}

// create link
export async function getInviteLink( params) {
  return request(
    `${process.env.UsersApi}/users/invitation`,
    {
      method: 'get',
      params: {
        ...params,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNmYyYjM4YmE3ZDczMGVmMzI5NjZhZTFlNmNiZmNhNjViNWRjOTZkIiwiaWF0IjoxNjgxMjYzMTQyLCJleHAiOjE2ODEzNDk1NDJ9.9PApL0QRGz8l02-Yy34U_GQC1KwVxPhIsBY3t55Ur3g"
      },
    },
  );
}
