import {useSelector} from 'react-redux';
import {loadingSelector} from './loadingSlice';
export const useLoading = () => {
  const loading = useSelector(loadingSelector);
  return loading;
};
