import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setLessonComplete} from './listCourseService';
export const useFetchCompleteLesson = _id => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLessonComplete(_id));
  }, [dispatch]);
};
