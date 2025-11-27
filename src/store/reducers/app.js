import {
  APP_SET_HEIGHT_TABBAR,
  APP_HIDE_TABBAR,
  SAVE_LIST_ITEM,
  SAVE_LIST_MY_COURSE,
  SAVE_PROFILE_USER,
  SAVE_SOURCE_LIST,
  APP_SAVE_LANGUAGE,
  APP_DATA_COURSE,
  SAVE_DATA_SCHOOL,
  APP_SAVE_COURSE_LEARNING,
  APP_CHOOSE_COURSE,
} from '../actions/types';
const init = {
  listmycourse: [],
  listItem: [],
  tabBarVisible: true,
  heightTabbar: 0,
  profileUser: {},
  isChanged: false,
  sourseList: [],
  language: 'vi',
  sourceLearning: [],
  idCourse: '',
};

export default (state = init, { type, payload }) => {
  switch (type) {
    case SAVE_SOURCE_LIST:
      return {
        ...state,
        sourseList: payload,
      };
    case APP_SAVE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    case SAVE_PROFILE_USER:
      return {
        ...state,
        profileUser: payload.data.data,
      };
    case APP_HIDE_TABBAR:
      return {
        ...state,
        tabBarVisible: payload,
      };

    case APP_CHOOSE_COURSE:
      return {
        ...state,
        idCourse: payload,
      };
    case APP_SET_HEIGHT_TABBAR:
      return {
        ...state,
        heightTabbar: payload,
      };
    case SAVE_LIST_ITEM: {
      return {
        ...state,
        listItem: payload,
      };
    }

    case APP_SAVE_COURSE_LEARNING: {
      return {
        ...state,
        sourceLearning: payload,
      };
    }

    case SAVE_LIST_MY_COURSE: {
      if (payload.page > 1) {
        return {
          ...state,
          listmycourse: [...state.listmycourse, ...payload.data],
        };
      }
      if (payload.page === 1) {
        return {
          ...state,
          listmycourse: payload.data,
        };
      }
      return {
        ...state,
        listmycourse: payload.data,
      };
    }
    default:
      return state;
  }
};
