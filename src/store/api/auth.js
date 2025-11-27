import {API, API_EDUBIT, API_REFRESH_TOKEN, token} from './common';

export default {
  login: (params = {}) =>
    API.post('v1/id/login', params, {headers: {Authorization: token}}),

  logout: (device_token, accessToken) =>
    API_EDUBIT.get(
      `v1/users/logout?device_token=${device_token}`,
      {},
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),

  loginEdubit: (params = {}) =>
    API_EDUBIT.post('v1/auth/login', params, {
      headers: {
        'Accept-Language': 'vi',
        'Content-Type': 'application/json',
      },
    }),

  verifyMFA: (params = {}, accessToken) =>
    API_EDUBIT.post('v1/auth/verify-mfa', params, {
      headers: {
        'Accept-Language': 'vi',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  methodMFA: accessToken =>
    API_EDUBIT.get(
      'v1/users/mfa',
      {},
      {
        headers: {
          'Accept-Language': 'vi',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),
  loginSites: (params = {}, currentBrowser) =>
    API_EDUBIT.post('v1/auth/login-site', params, {
      headers: {
        'Accept-Language': 'vi',
        'Content-Type': 'application/json',
        'current-browser': currentBrowser,
      },
    }),
  refreshToken: (params = {}) => API_EDUBIT.post('v1/auth/refresh', params),

  loginFacebook: (params = {}) => API.post(`v1/facebooklogin`, params),

  register: (params = {}) =>
    API.post(`v1/id/register`, params, {headers: {Authorization: token}}),

  registerEdubit2: (params = {}) =>
    API_EDUBIT.post(`v1/auth/register`, params, {
      headers: {
        'Accept-Language': 'vi',
        'Content-Type': 'application/json',
      },
    }),

  userSites: email =>
    API_EDUBIT.get(
      `v1/users/sites?email=${email}`,
      {},
      {
        headers: {
          // 'accept': 'application/json',
          // 'Content-Type': 'application/json'
        },
      },
    ),

  changePass: (params = {}) =>
    API_EDUBIT.post(`v2/auth/forgot-password`, params, {headers: {}}),

  profileUser: (params = {}) => API.post(`v1/profileuser`, params),
};
