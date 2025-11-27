// Create action-types to use call api, save data to reducer or to do something

export const APP_HIDE_TABBAR = 'app/hideTabbar';
export const APP_SET_HEIGHT_TABBAR = 'app/setHeightTabbar';

/**
 * AUTH - Mấy thứ liên quan đến đăng nhập đăng xuất, lưu thông tin, trạng thái đăng nhập -- auth.js
 */
export const APP_SET_AUTH_STATE = 'app/setAuthState';
export const APP_SAVE_LOGGED_USER = 'app/saveLoggedUser';
export const APP_REMOVE_LOGGED_USER = 'app/removeLoggedUser';
export const APP_USERS_ME = 'app/usersMe';

export const APP_LOGIN = 'app/login';
export const APP_LOGIN_EDUBIT = 'app/loginEdubit';
export const APP_REFRESH_TOKEN = 'app/refreshToken';
export const APP_LOGIN_SITES = 'app/loginSites';
export const APP_CHECK_SITE = 'app/checkSite';

export const APP_LOGIN_FACEBOOK = 'app/loginFacebook';
export const APP_LOGOUT = 'app/logout';
export const APP_RIGISTER = 'app/register';
export const APP_RIGISTER_EDUBIT1 = 'app/registerEdubit1';
export const APP_CHANGE_PASS = 'app/changePass';
export const APP_PROFILE_USER = 'app/profileUser';
/**
 * REQUEST - Kiểm tra trạng thái của 1 request lên server: pending, success, failure -- Xem thêm trong reducers - common.js
 */
export const MARK_REQUEST_PENDING = 'request/requestPending';
export const MARK_REQUEST_SUCCESS = 'request/requestSuccess';
export const MARK_REQUEST_FAILED = 'request/requestFailed';
export const MARK_REQUEST_CANCELLED = 'request/requestCancelled';
export const INVOKE_CALLBACK = 'request/invokeCallBack';
export const GET_LOCATION = 'app/getLocation';
export const APP_LIST_ITEM = 'app/listItem';
export const SAVE_LIST_ITEM = 'app/saveListItem';
export const APP_SOURSE_DETAIL = '/sourseDetail';
export const APP_TREND_SEARCH = 'app/apptrendsearch';
export const APP_SEARCH_COURSE = 'app/searchcourse';
export const APP_LIST_MY_COURSE = 'app/listmycourse';
export const APP_COURSES = 'app/courses';
export const APP_DEVICES = 'app/devices';
export const APP_DEVICES_LIMIT_CHECK = 'app/devicesLimitCheck';
// APP_DEVICES_LIMITCHECK
export const APP_COURSES_ME = 'app/courseMe';
export const APP_COURSES_DETAIL = 'app/coursesDetail';
export const APP_LESSONS = 'app/lessons';
export const APP_TEACHERS = 'app/teachers';
export const APP_TRIAL_LESSONS = 'app/trialLessons';
export const APP_LIST_SCHOOL = 'app/getListSchool';
export const SAVE_LIST_MY_COURSE = 'app/saveListMyCourse';
export const APP_DISCUSSIONS_NOTE = 'app/discussionsNote';
export const APP_LEARN = 'app/learn';
export const APP_LIST_SOURCE_CATEGORY = 'app/listSourceCategory';
export const APP_DETAIL_COURSE = 'app/detailCourse';
export const APP_ACTIVE_COURSE = 'app/activeCourse';
export const SAVE_LIST_SOURCE_CATEGORY = 'app/saveListSourceCategory';
export const APP_ADD_DISCUSSIONS = 'app/addDiscussions';
export const APP_ADD_NOTE = 'app/addNote';
export const APP_SOURSE_DISCUSSION = 'app/course_discussion';
export const APP_DOWNLOAD_FILE = 'app/downloadfile';
export const APP_RATING_COURSE = 'app/ratingCourse';
export const APP_DETAIL_COMBO = 'app/detailCombo';
export const APP_UPDATE_PROFILE = 'app/updateProfile';
export const SAVE_PROFILE_USER = 'app/saveProfileUser';
export const APP_NOTIFICATION = 'app/notification';
export const SAVE_SOURCE_LIST = 'app/saveSourceList';
export const APP_SAVE_LOGIN = 'app/saveLogin';
export const APP_SAVE_MEM_SITE = 'app/saveMemSite';

export const APP_SAVE_COURSE_LEARNING = 'app/saveCourseLearning';

export const APP_SAVE_LIST_SITE = 'app/APP_SAVE_LIST_SITE';
export const APP_DETAIL_COMBO_COURSE = 'app/detailComboCourse';
export const APP_COMPLETE_LESSON = 'app/completeLesson';
export const APP_CHECK_CLOSE_LESSON = 'app/checkCloseLesson';
export const APP_UPLOAD_AVATAR = 'app/uploadAvatar';
export const APP_COURSE_DONE = 'app/courseDone';
export const APP_RIGISTER_FACEBOOK = 'app/registerFacebook';
export const APP_GET_INFO = ' app/getInfo';
export const APP_GET_PUBLIC_QUIZES = 'app/getPublicQuizes';
export const APP_GET_QUIZ_DETAIL = 'app/getQuizDetail';
export const APP_GET_LIST_CATEGORY = 'app/getListCategory';
export const APP_GET_QUIZ_QUESTIONS = 'app/getQuizQuestions';
export const APP_SUBMIT_QUIZ = 'app/submitQuiz';
export const APP_GET_RESULT_DETAIL = 'app/getResultDetail';
export const APP_GET_ACTIVITY = 'app/getActivity';
export const APP_CHANGE_VIEW_SITE = 'app/changeViewSite';
export const APP_DELETE_ACOUNT = 'app/deleteAcount';
export const APP_CHECK_PASS = 'app/checkPass';
export const APP_CHECK_DEVICE = 'app/checkDevice';
export const APP_USER_SITES = 'app/userSites';
export const APP_SITES_GET_TOKEN = 'app/sitesGetToken';
export const APP_SEARCH_COURSE_ME = 'app/searchCourseMe';
export const APP_INFO_SITE = 'app/inforSite';
export const APP_LIST_LESSONS = 'app/listLesson';
export const APP_LESSONS_ID = 'app/lessonsID';
export const APP_SAVE_LANGUAGE = 'app/saveLanguage';
export const APP_DATA_SCHOOL = 'app/dataSchool';
export const SAVE_DATA_SCHOOL = 'app/saveDataSchool';
export const APP_COURSES_MEMBERSHIP = 'app/courseMemberShip';
export const APP_SAVE_INFOR_SID= "app/saveInforSid";
export const APP_SAVE_USE_ME = "app/saveUseMe";
export const APP_QUIZ_TEST = "app/quizTest";
export const APP_CHOOSE_COURSE = "app/checkCourse";
export const APP_VERIFY_MFA = "app/verifyMFA";
export const APP_METHOD_MFA = "app/methodMFA";

export const APP_USER_MAP_COURSE = "app/userMapCourse";
