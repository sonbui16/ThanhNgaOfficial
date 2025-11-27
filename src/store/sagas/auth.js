import {takeLatest, all, put, take} from 'redux-saga/effects';
import {
  APP_LOGIN,
  APP_LOGIN_FACEBOOK,
  APP_RIGISTER,
  APP_CHANGE_PASS,
  APP_PROFILE_USER,
  APP_LOGIN_EDUBIT,
  APP_REFRESH_TOKEN,
  APP_RIGISTER_EDUBIT1,
  APP_USER_SITES,
  APP_LOGIN_SITES,
  APP_LOGOUT,
  APP_VERIFY_MFA,
  APP_METHOD_MFA
} from 'actions/types';
import auth from '../api/auth';
import {saveProfileUser, usersMe, inforSite} from '../actions/app';
import {setAuthState, saveLoggedUser, removeLoggedUser} from 'actions/auth';
import {createRequestSaga} from './common';
// import {useSelector} from 'react-redux';
// const language = useSelector(state => state);
const requestLogin = createRequestSaga({
  request: auth.login,
  key: 'login',
  success: [
    // (res) => {saveLoggedUser(res)},
    // () => setAuthState(true),
  ],
  failure: [],
  //  Request thành công or lỗi, 2 funtion nay chỉ có thể thực thiện function không dispath đc action
  functionSuccess: [],
  functionFailure: [],
});

const requestLoginEdubit = createRequestSaga({
  request: auth.loginEdubit,
  key: 'loginEdubit',
  success: [
    // (res) => {saveLoggedUser(res)},
    // () => setAuthState(true),
  ],
  failure: [],
  //  Request thành công or lỗi, 2 funtion nay chỉ có thể thực thiện function không dispath đc action
  functionSuccess: [
    // () => todoSomething(err)
  ],
  functionFailure: [
    // () => funcHandleErr(err)
  ],
});

const requestLoginStites = createRequestSaga({
  request: auth.loginSites,
  key: 'loginSites',
  success: [res => usersMe(res.access_token)],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestRefreshToken = createRequestSaga({
  request: auth.refreshToken,
  key: 'refreshToken',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestRegister = createRequestSaga({
  request: auth.register,
  key: 'register',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestUserSites = createRequestSaga({
  request: auth.userSites,
  key: 'userSites',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestregisterEdubit2 = createRequestSaga({
  request: auth.registerEdubit2,
  key: 'registerEdubit2',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestChangePass = createRequestSaga({
  request: auth.changePass,
  key: 'changePass',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestProfileUser = createRequestSaga({
  request: auth.profileUser,
  key: 'profileUser',
  success: [res => saveProfileUser(res)],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestLoginFacebook = createRequestSaga({
  request: auth.loginFacebook,
  key: 'loginFacebook',
  success: [res => saveLoggedUser(res), () => setAuthState(true)],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestLogout = createRequestSaga({
  request: auth.logout,
  key: 'logout',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestVerifyMFA = createRequestSaga({
  request: auth.verifyMFA,
  key: 'verifyMFA',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestMethodMFA = createRequestSaga({
  request: auth.methodMFA,
  key: 'methodMFA',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(APP_LOGIN, requestLogin),
      takeLatest(APP_VERIFY_MFA, requestVerifyMFA),
      takeLatest(APP_METHOD_MFA, requestMethodMFA),


      takeLatest(APP_LOGOUT, requestLogout),
      takeLatest(APP_LOGIN_FACEBOOK, requestLoginFacebook),
      takeLatest(APP_RIGISTER, requestRegister),
      takeLatest(APP_RIGISTER_EDUBIT1, requestregisterEdubit2),
      takeLatest(APP_CHANGE_PASS, requestChangePass),
      takeLatest(APP_PROFILE_USER, requestProfileUser),
      takeLatest(APP_LOGIN_EDUBIT, requestLoginEdubit),
      takeLatest(APP_REFRESH_TOKEN, requestRefreshToken),
      takeLatest(APP_USER_SITES, requestUserSites),
      takeLatest(APP_LOGIN_SITES, requestLoginStites),
    ]);
  },
];
