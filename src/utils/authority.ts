export function getToken() {
  return JSON.parse(localStorage.getItem('userInfo'))?.['access_token'];
}

