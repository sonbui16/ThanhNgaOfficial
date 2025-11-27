import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  nextLesson: false,
};
export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setNextLesson: state => {
      state.nextLesson = true;
    },
    disableNextLesson: state => {
      state.nextLesson = false;
    },
  },
});
export const {setNextLesson, disableNextLesson} = videoSlice.actions;
export const {reducerPath} = videoSlice;

export const nextLessonSelector = state => state.video.nextLesson;


export default videoSlice;
