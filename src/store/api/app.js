import { API, API_EDUBIT, token } from './common';

// create request => dispath to saga
export default {
  deleteAcount: tokenUser =>
    API_EDUBIT.delete(
      `v1/users/me`,
      {},
      { headers: { Authorization: `Bearer ${tokenUser}` } },
    ),

  sourseDetail: (code, idUser) =>
    API.get(
      `v1/courses/incourse/${code}/${idUser}`,
      {},
      { headers: { Authorization: token } },
    ),

  checkPass: (idUser, lessonId) =>
    API.post(
      `v1/lesson/check-pass/${idUser}/${lessonId}`,
      {},
      {
        headers: { Authorization: token },
      },
    ),

  // checkDevice ĐIỀN VÀO ĐAY
  checkDevice: (idUser, appId, params = {}) =>
    API.get(`v1/id/check-app/${idUser}/${appId}`, params, {
      headers: { Authorization: token },
    }),

  courseDone: (params = {}) =>
    API.post(`v1/courses/get-complete-course`, params, {
      headers: { Authorization: token },
    }),

  trendsearch: (params = {}) => API.post(`v1/trendsearch`, params),

  searchcourse: (id_Site, key) =>
    API_EDUBIT.get(
      `v1/courses?page=1&limit=10&site_id=${id_Site}&name=${key}`,
      {},
      { headers: { 'Accept-Language': 'vi', accept: 'application/json' } },
    ),

  checkCloseLesson: (params = {}) =>
    API.post(`v1/courses/check-close-lesson`, params, {
      headers: { Authorization: token },
    }),

  uploadAvatar: (idUser, params = {}) =>
    API.post(`v1/id/upload-avatar/${idUser}`, params, {
      headers: { Authorization: token },
    }),

  listmycourse: (idCourse, accessToken) =>
    API_EDUBIT.get(
      `v1/sites/${idCourse}`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } },
    ),
  inforSite: (id, tokenSite) =>
    API_EDUBIT.get(
      `v1/sites/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenSite}`,
          accept: 'application/json',
          'Accept-Language': 'vi',
        },
      },
    ),

  listLesson: (id, token) =>
    API_EDUBIT.get(
      `v1/courses/${id}/lessons`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Accept-Language': 'vi',
        },
      },
    ),
  ///////////switchswitch
  lessonsID: (type, token, id, params = {}) => {
    switch (type) {
      case 'get':
        return API_EDUBIT.get(
          `v1/lessons/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      case 'patch':
        return API_EDUBIT.patch(`v1/lessons/${id}`, params, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      //app khác chèn vào đây
      case 'noSearch':
        return API_EDUBIT.get(`v1/courses/me?ids[]=${token}`, {
          headers: {
            Authorization: `Bearer ${id}`,
            accept: 'application/json',
            'Accept-Language': 'vi',
          },
        });
      case 'attachment':
        return API_EDUBIT.post(
          `v1/courses/${token}/attachment`,
          {},
          {
            headers: {
              Authorization: `Bearer ${id}`,
              accept: 'application/json',
              'Accept-Language': 'vi',
            },
          },
        );

      default:
        break;
    }
  },
  courses: (page, limit, site_id) =>
    // /courses?page=1&limit=10&site_id=5c3e18216803fa3518834fe3
    API_EDUBIT.get(
      `v1/courses?page=${page}&limit=${limit}&site_id=${site_id}`,
      {
        headers: {
          'Accept-Language': 'vi',
        },
      },
    ),
  sitesGetToken: (idCourse, accessToken) =>
    API_EDUBIT.get(
      `v1/sites/switch/${idCourse}`,
      {},
      {
        headers: {
          'Accept-Language': 'vi',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),

  coursesDetail: (id_course, token) =>
    API_EDUBIT.get(
      `v1/courses/${id_course}`,
      {},
      {
        headers: {
          // accept: `application/json`,
          Authorization: `Bearer ${token} `,
        },
      },
    ),

  lessons: token =>
    API_EDUBIT.get(
      `v1/lessons?page=1&limit=10`,
      {},
      {
        headers: {
          accept: `application/json`,
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  saveReceipt: (params = {}, token) =>
    API_EDUBIT.post(`ipa/save-receipt`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  teachers: (id_teacher, params = {}) =>
    API_EDUBIT.get(`v1/teachers/${id_teacher}`, params, {
      headers: {
        accept: `application/json`,
      },
    }),
  trialLessons: id =>
    API_EDUBIT.get(
      `v1/courses/${id}/trial-lessons`,
      {},
      {
        headers: {
          accept: 'application/json',
        },
      },
    ),

  usersMe: accessToken =>
    API_EDUBIT.get(
      `v1/users/me`,
      {},
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),

  devices: (params = {}, accessToken) =>
    API_EDUBIT.post(`v1/devices`, params, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  courseMemberShip: (page, accessToken) =>
    API_EDUBIT.get(
      `v1/courses/me/membership?page=${page}&limit=100`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
      },
    ),
  devicesLimitCheck: (params = {}, accessToken) =>
    API_EDUBIT.post(`v1/devices/limit-check`, params, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  // listmycourse: idUser =>
  //   API.get(
  //     `courses/my-courses/${idUser}`,
  //     {},
  //     {headers: {Authorization: token}},
  //   ),

  // devices: (params = {}) => API.post(`discussionsnote`, params),
  discussionsNote: (params = {}) => API.post(`v1/discussionsnote`, params),

  quizTest: (url, accessToken) =>
    API_EDUBIT.get(
      `v1/quiz-test/select-list?selects[]=quiz_test_count&?selects[]=quiz_title${url}`,
      {},
      { headers: { Authorization: accessToken } },
    ),

  learn: (params = {}) => API.post(`v1/learn`, params),

  listSourceCategory: () =>
    API.get(
      `v1/category/list-category`,
      {},
      { headers: { Authorization: token } },
    ),

  addDiscussions: (params = {}) => API.post(`v1/adddiscussion`, params),

  addNote: (params = {}) => API.post(`v1/addnote`, params),

  course_discussion: (params = {}) => API.post(`v1/course_discussion`, params),

  downloadfile: (params = {}) => API.post(`v1/downloadfile`, params),

  ratingCourse: (params = {}) => API.post(`v1/ratingcourse`, params),

  detailCombo: (params = {}) => API.post(`v1/detailcombo`, params),

  activeCourse: (params = {}) =>
    API.post(`v1/courses/join-room`, params, {
      headers: { Authorization: token },
    }),

  completeLesson: params =>
    API.post(`v1/courses/complete-lesson`, params, {
      headers: { Authorization: token },
    }),

  updateProfile: (idUser, params = {}) =>
    API.post(`v1/id/update-profile/${idUser}`, params, {
      headers: { Authorization: token },
    }),

  registerFacebook: (params = {}) =>
    API.post(`v1/id/register-facebook`, params, {
      headers: { Authorization: token },
    }),

  notification: (params = {}) => API.post(`v1/notification`, params),

  listItem: (params = {}, type) => {
    switch (type) {
      case 'promotion_course':
        return API.post(`v1/promotioncourses`, params);
      case 'new_course':
        return API.post(`v1/newcourses`, params);
      case 'hot_course':
        return API.post(`v1/hotcourses`, params);
      case 'favorite_course':
        return API.post(`v1/favoritecourse`, params);
      default:
        break;
    }
  },

  detailComboCourse: (code, idUser) =>
    API.get(
      `v1/courses/detail-combo-course/${code}?user_id=${idUser}`,
      {},
      { headers: { Authorization: token } },
    ),
  getListSchool: (page, token_edubit) =>
    API_EDUBIT.get(
      `v1/sites?page=${page}&limit=8`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token_edubit}`,
        },
      },
    ),
  userMapCourse: (id, token) =>
    API_EDUBIT.get(
      `v1/courses/${id}/user-map-course`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Accept-Language': 'vi',
        },
      },
    ),

  courseMe: (page, token) =>
    API_EDUBIT.get(
      `v1/courses/me?page=${page}&limit=50`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
          'Accept-Language': 'vi',
        },
      },
    ),

  getAppInfo: () =>
    API.get(
      `v1/id/version-and-show`,
      {},
      { headers: { Authorization: token } },
    ),
  getPublicQuizes: (params = {}) =>
    API.post(`v1/quiz/list`, params, { headers: { Authorization: token } }),
  getQuizDetail: (user_id, quiz_id) =>
    API.get(
      `v1/quiz/detail/${user_id}/${quiz_id}`,
      {},
      { headers: { Authorization: token } },
    ),
  getListCategory: () =>
    API.get(`v1/quiz/category`, {}, { headers: { Authorization: token } }),

  getQuizQuestions: quiz_id =>
    API.get(
      `v1/quiz/questions/${quiz_id}`,
      {},
      { headers: { Authorization: token } },
    ),
  submitQuiz: () => API.get(``, {}, { headers: { Authorization: token } }),
  getResultDetail: () => API.get(``, {}, { headers: { Authorization: token } }),
  getActivity: params =>
    API.post(`v1/quiz/result/list`, params, {
      headers: { Authorization: token },
    }),
  changeViewSite: params =>
    API.post(`v1//id/view-site-mobile`, params, {
      headers: { Authorization: token },
    }),
};
