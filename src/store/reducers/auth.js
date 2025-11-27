import {
  APP_SET_AUTH_STATE,
  APP_REMOVE_LOGGED_USER,
  APP_SAVE_LOGGED_USER,
  APP_SAVE_LOGIN,
  APP_SAVE_MEM_SITE,
  APP_SAVE_LIST_SITE,
  APP_CHECK_SITE,
  APP_SAVE_INFOR_SID,
  APP_SAVE_USE_ME,
} from '../../store/actions/types';

const init = {
  loggedIn: false, // Check status login
  check_site: false, // Check status login_site
  guided: false, // Check status guide - false : chưa hướng dẫn, true: đã qua hướng dẫn
  user: {}, // save all info user
  saveLogin: {},
  memSite: [],
  listSite: {},
  infoSite: {},

  infoUseMe: {},
};

export default (state = init, {type, payload}) => {
  switch (type) {
    case APP_SET_AUTH_STATE: {
      return {
        ...state,
        loggedIn: payload.loggedIn || false,
        guided: payload.guided,
      };
    }
    case APP_SAVE_USE_ME:
      return {
        ...state,
        infoUseMe: payload,
      };
    case APP_SAVE_INFOR_SID:
      return {
        ...state,
        infoSite: payload,
        // token: payload.data.data.token || state.auth.token,
      };
    case APP_CHECK_SITE: {
      return {
        ...state,
        check_site: payload,
      };
    }
    case APP_SAVE_LOGGED_USER:
      return {
        ...state,
        user: payload,
        // token: payload.data.data.token || state.auth.token,
      };

    case APP_REMOVE_LOGGED_USER:
      return {...state, ...init};
    case APP_SAVE_LOGIN:
      return {
        ...state,
        saveLogin: payload,
      };
    case APP_SAVE_MEM_SITE:
      return {
        ...state,
        memSite: payload,
      };
    case APP_SAVE_LIST_SITE:
      return {
        ...state,
        listSite: payload,
      };
    default:
      return state;
  }
};
