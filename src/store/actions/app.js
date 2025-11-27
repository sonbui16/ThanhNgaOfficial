import {
  APP_HIDE_TABBAR,
  APP_SET_HEIGHT_TABBAR,
  APP_LIST_ITEM,
  SAVE_LIST_ITEM,
  APP_SOURSE_DETAIL,
  APP_TREND_SEARCH,
  APP_SEARCH_COURSE,
  APP_LIST_MY_COURSE,
  SAVE_LIST_MY_COURSE,
  APP_DISCUSSIONS_NOTE,
  APP_LEARN,
  GET_LOCATION,
  APP_LIST_SOURCE_CATEGORY,
  SAVE_LIST_SOURCE_CATEGORY,
  APP_SOURSE_DISCUSSION,
  APP_DOWNLOAD_FILE,
  APP_RATING_COURSE,
  APP_ACTIVE_COURSE,
  APP_ADD_DISCUSSIONS,
  APP_ADD_NOTE,
  APP_DETAIL_COMBO,
  APP_SAVE_LANGUAGE,
  APP_UPDATE_PROFILE,
  SAVE_PROFILE_USER,
  APP_CATEGORY_DETAIL,
  APP_NOTIFICATION,
  APP_DETAIL_COURSE,
  SAVE_SOURCE_LIST,
  APP_DETAIL_COMBO_COURSE,
  APP_SAVE_LOGIN,
  APP_TYPE_PAYMENT,
  APP_COMPLETE_LESSON,
  APP_CHECK_CLOSE_LESSON,
  APP_UPLOAD_AVATAR,
  APP_COURSE_DONE,
  APP_RIGISTER_FACEBOOK,
  APP_GET_INFO,
  APP_GET_QUIZ_DETAIL,
  APP_GET_PUBLIC_QUIZES,
  APP_GET_LIST_CATEGORY,
  APP_GET_QUIZ_QUESTIONS,
  APP_SUBMIT_QUIZ,
  APP_GET_RESULT_DETAIL,
  APP_GET_ACTIVITY,
  APP_CHANGE_VIEW_SITE,
  APP_DELETE_ACOUNT,
  APP_CHECK_PASS,
  APP_CHECK_DEVICE,
  APP_COURSES,
  APP_LIST_SCHOOL,
  APP_COURSES_ME,
  APP_USERS_ME,
  APP_SITES_GET_TOKEN,
  APP_COURSES_DETAIL,
  APP_LESSONS,
  APP_TEACHERS,
  APP_TRIAL_LESSONS,
  APP_DEVICES,
  APP_DEVICES_LIMIT_CHECK,
  APP_SEARCH_COURSE_ME,
  APP_LIST_LESSONS,
  APP_LESSONS_ID,
  APP_DATA_SCHOOL,
  SAVE_DATA_SCHOOL,
  APP_INFO_SITE,
  APP_COURSES_MEMBERSHIP,
  APP_SAVE_COURSE_LEARNING,
  APP_QUIZ_TEST,
  APP_CHOOSE_COURSE,
  APP_USER_MAP_COURSE
} from './types';
export const courses = (...args) => ({type: APP_COURSES, args});
export const detailCourse = (...args) => ({type: APP_DETAIL_COURSE, args});
export const courseMe = (...args) => ({type: APP_COURSES_ME, args});
export const usersMe = (...args) => ({type: APP_USERS_ME, args});
export const sitesGetToken = (...args) => ({type: APP_SITES_GET_TOKEN, args});
export const inforSite = (...args) => ({type: APP_INFO_SITE, args});
export const devices = (...args) => ({type: APP_DEVICES, args});
export const devicesLimitCheck = (...args) => ({
  type: APP_DEVICES_LIMIT_CHECK,
  args,
});
export const courseMemberShip = (...args) => ({type: APP_COURSES_MEMBERSHIP , args});
export const quizTest = (...args) => ({type: APP_QUIZ_TEST , args});


export const coursesDetail = (...args) => ({type: APP_COURSES_DETAIL, args});
export const lessons = (...args) => ({type: APP_LESSONS, args});
export const teachers = (...args) => ({type: APP_TEACHERS, args});
export const trialLessons = (...args) => ({type: APP_TRIAL_LESSONS, args});

export const listLesson = (...args) => ({type: APP_LIST_LESSONS, args});
export const lessonsID = (...args) => ({type: APP_LESSONS_ID, args});

export const getLocation = (...args) => ({type: GET_LOCATION, args});
export const listmycourse = (...args) => ({type: APP_LIST_MY_COURSE, args});

export const listItem = (...args) => ({type: APP_LIST_ITEM, args});
export const dataSchool = (...args) => ({type: APP_DATA_SCHOOL, args});
export const sourseDetail = (...args) => ({type: APP_SOURSE_DETAIL, args});
export const checkPass = (...args) => ({type: APP_CHECK_PASS, args});
export const checkDevice = (...args) => ({type: APP_CHECK_DEVICE, args});
export const searchCourseMe = (...args) => ({type: APP_SEARCH_COURSE_ME, args});

export const trendsearch = (...args) => ({type: APP_TREND_SEARCH, args});
export const searchcourse = (...args) => ({type: APP_SEARCH_COURSE, args});
export const userMapCourse = (...args) => ({type: APP_USER_MAP_COURSE, args});

export const discussionsNote = (...args) => ({
  type: APP_DISCUSSIONS_NOTE,
  args,
});
export const learn = (...args) => ({type: APP_LEARN, args});
export const listSourceCategory = (...args) => ({
  type: APP_LIST_SOURCE_CATEGORY,
  args,
});
export const addDiscussions = (...args) => ({type: APP_ADD_DISCUSSIONS, args});
export const addNote = (...args) => ({type: APP_ADD_NOTE, args});
export const course_discussion = (...args) => ({
  type: APP_SOURSE_DISCUSSION,
  args,
});
export const saveLanguage = data => ({
  type: APP_SAVE_LANGUAGE,
  payload: data,
});
export const downloadfile = (...args) => ({type: APP_DOWNLOAD_FILE, args});
export const ratingCourse = (...args) => ({type: APP_RATING_COURSE, args});
export const detailCombo = (...args) => ({type: APP_DETAIL_COMBO, args});

export const updateProfile = (...args) => ({type: APP_UPDATE_PROFILE, args});
export const notification = (...args) => ({type: APP_NOTIFICATION, args});
export const deleteAcount = (...args) => ({type: APP_DELETE_ACOUNT, args});
export const activeCourse = (...args) => ({type: APP_ACTIVE_COURSE, args});
export const detailComboCourse = (...args) => ({
  type: APP_DETAIL_COMBO_COURSE,
  args,
});
export const completeLesson = (...args) => ({type: APP_COMPLETE_LESSON, args});
export const checkCloseLesson = (...args) => ({
  type: APP_CHECK_CLOSE_LESSON,
  args,
});
export const uploadAvatar = (...args) => ({type: APP_UPLOAD_AVATAR, args});
export const courseDone = (...args) => ({type: APP_COURSE_DONE, args});
export const registerFacebook = (...args) => ({
  type: APP_RIGISTER_FACEBOOK,
  args,
});
export const getAppInfo = (...args) => ({type: APP_GET_INFO, args});
export const getListSchool = (...args) => ({type: APP_LIST_SCHOOL, args});
export const getPublicQuizes = (...args) => ({
  type: APP_GET_PUBLIC_QUIZES,
  args,
});
export const getQuizDetail = (...args) => ({type: APP_GET_QUIZ_DETAIL, args});
export const getListCategory = (...args) => ({
  type: APP_GET_LIST_CATEGORY,
  args,
});
export const getQuizQuestions = (...args) => ({
  type: APP_GET_QUIZ_QUESTIONS,
  args,
});
export const submitQuiz = (...args) => ({type: APP_SUBMIT_QUIZ, args});
export const getResultDetail = (...args) => ({
  type: APP_GET_RESULT_DETAIL,
  args,
});
export const getActivity = (...args) => ({type: APP_GET_ACTIVITY, args});
export const changeViewSite = (...args) => ({type: APP_CHANGE_VIEW_SITE, args});
export const hideTabbar = tabBarVisible => ({
  type: APP_HIDE_TABBAR,
  payload: tabBarVisible,
});
export const setHeightTabbar = heightTabbar => ({
  type: APP_SET_HEIGHT_TABBAR,
  payload: heightTabbar,
});
export const saveListItem = data => ({
  type: SAVE_LIST_ITEM,
  payload: data,
});
export const saveSchool = data => ({
  type: SAVE_DATA_SCHOOL,
  payload: data,
});
export const saveListSourceCategory = data => ({
  type: SAVE_LIST_SOURCE_CATEGORY,
  payload: data,
});
export const saveListMyCourse = data => ({
  type: SAVE_LIST_MY_COURSE,
  payload: data,
});
export const saveProfileUser = data => ({
  type: SAVE_PROFILE_USER,
  payload: data,
});
export const saveSourceList = data => ({
  type: SAVE_SOURCE_LIST,
  payload: data,
});

export const saveSourceLearning = data => ({
  type: APP_SAVE_COURSE_LEARNING,
  payload: data,
});


export const saveLogin = data => ({
  type: APP_SAVE_LOGIN,
  payload: data,
});

export const checkCourse = data => ({
  type: APP_CHOOSE_COURSE,
  payload: data,
});

