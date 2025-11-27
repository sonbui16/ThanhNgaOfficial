import {
  APP_LOGIN,
  APP_LOGIN_FACEBOOK,
  APP_RIGISTER,
  APP_LOGOUT,
  APP_CHANGE_PASS,
  APP_SET_AUTH_STATE,
  APP_SAVE_LOGGED_USER,
  APP_REMOVE_LOGGED_USER,
  APP_PROFILE_USER,
  APP_SAVE_MEM_SITE,
  APP_SAVE_LIST_SITE,
  APP_LOGIN_EDUBIT,
  APP_REFRESH_TOKEN,
  APP_RIGISTER_EDUBIT1,
  APP_USER_SITES,
  APP_LOGIN_SITES,
  APP_CHECK_SITE,
  APP_SAVE_INFOR_SID,
  APP_SAVE_USE_ME,
  APP_VERIFY_MFA,
  APP_METHOD_MFA
} from './types';

/**
 * Action call API
 * @param  {object} args
 */
export const login = (...args) => ({type: APP_LOGIN, args});
export const loginEdubit = (...args) => ({type: APP_LOGIN_EDUBIT, args});
export const loginSites = (...args) => ({type: APP_LOGIN_SITES, args});

export const verifyMFA = (...args) => ({type: APP_VERIFY_MFA, args});
export const methodMFA = (...args) => ({type: APP_METHOD_MFA, args});


export const refreshToken = (...args) => ({type: APP_REFRESH_TOKEN, args});
export const userSites = (...args) => ({type: APP_USER_SITES, args});

export const loginFacebook = (...args) => ({type: APP_LOGIN_FACEBOOK, args});
export const register = (...args) => ({type: APP_RIGISTER, args});
export const registerEdubit2 = (...args) => ({
  type: APP_RIGISTER_EDUBIT1,
  args,
});
export const saveUseMe = data => ({
  type: APP_SAVE_USE_ME,
  payload: data
});
export const saveInforSid = data => ({
  type: APP_SAVE_INFOR_SID,
  payload: data,
});
export const logout = (...args) => ({type: APP_LOGOUT, args});
export const changePass = (...args) => ({type: APP_CHANGE_PASS, args});
export const profileUser = (...args) => ({type: APP_PROFILE_USER, args});

/**
 * Sets the authentication state of the application -- Save DATA to reducer
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuthState = (loggedIn, guided) => ({
  type: APP_SET_AUTH_STATE,
  payload: {loggedIn, guided},
});
export const saveLoggedUser = data => ({
  type: APP_SAVE_LOGGED_USER,
  payload: data,
});
export const saveMemSite = data => ({
  type: APP_SAVE_MEM_SITE,
  payload: data,
});
export const saveListSite = data => ({
  type: APP_SAVE_LIST_SITE,
  payload: data,
});
export const checkSite = data => ({
  type: APP_CHECK_SITE,
  payload: data,
});

/**
 * Tells the app we want to log out a user
 */
export const removeLoggedUser = () => ({type: APP_REMOVE_LOGGED_USER});
