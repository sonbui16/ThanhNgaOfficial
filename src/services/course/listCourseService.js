import {createAsyncThunk} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {showLoading, hideLoading} from '../../features/loading';

import http from '../../utils/http';
export const getList = createAsyncThunk(
  'course/getList',
  async (_, thunkAPI) => {
    const {dispatch, getState} = thunkAPI;
    dispatch(showLoading());
    const token = getState().auth.listSite.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await http.get('v1/courses/me?page=1&limit=50', config);
      console.log('response111', response);
      dispatch(hideLoading());
      return response;
    } catch (error) {
      dispatch(hideLoading());
      throw new Error('Failed to fetch courses');
    }
  },
);
export const setLessonComplete = createAsyncThunk(
  'course/setLessonComplete',
  async (lessonId, thunkAPI) => {
    const {getState} = thunkAPI;
    const token = getState().auth.listSite.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.patch(
        `v1/lessons/${lessonId}`,
        {complete_status: 1},
        config,
      );
      console.log('response1', response);
      // return response;
    } catch (error) {
      throw new Error('Failed to set lesson complete');
    }
  },
);

export const getLesson = async (lessonId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await http.get(`v1/lessons/${lessonId}`, config);
  return response;
};
