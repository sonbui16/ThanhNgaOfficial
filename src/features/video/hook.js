import {useSelector} from 'react-redux';

import {nextLessonSelector} from './videoSlice';

export const useNextLesson = () => {
  const next = useSelector(nextLessonSelector);
  return next;
};
