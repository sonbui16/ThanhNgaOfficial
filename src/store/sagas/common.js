import {call, put, take, race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {Alert} from 'react-native';
import {API_TIMEOUT} from '../../constants/api';
import {
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
  invokeCallback,
} from '../actions/common';
export const rejectErrors = res => {
  const {status, data, ok} = res;
  if (ok) {
    return res;
  } else {
    let err = res?.data?.errors;

    if (Array.isArray(err)) {
      const errMessage = err[0]?.constraints;
      const valueErr = Object.values(errMessage)[0];
      // console.log('valueErr', valueErr);

      let titleErr = '';
      switch (valueErr) {
        case 'email must be an email':
        case 'username must be an email':
          titleErr = 'Vui lòng nhập đúng email !';
          break;
        case 'name must be shorter than or equal to 50 characters':
          titleErr = 'Họ và tên phải ngắn hơn hoặc bằng 50 ký tự';
          break;
        case 'name must be longer than or equal to 3 characters':
          titleErr = 'Họ tên phải dài hơn hoặc bằng 3 ký tự';
          break;
        default:
          titleErr = valueErr;
          break;
      }
      Alert.alert('Thông báo', `${titleErr}`);
    } else {
      // if (res?.data?.statusCode === 404) {
      //   return;
      // }
      // Alert.alert('Thông báo', res?.data?.message);
    }
    return Promise.reject({
      message: res.data,
    });
  }
  if (!data) {
    return Promise.reject({
      message: res.problem,
    });
  }
  if (data && data.code >= 200 && data.code < 300) {
    return res;
  }
  if (data) {
    return res;
  }

  return Promise.reject({
    code: data.code,
    message: data.message,
    error: data.error,
    //subData.message !== 'There is missing customer email.' ? data.errors[0] : subData.message,
    status,
  });
};
export const respondJson = res => res.data;
export const createRequestSaga = ({
  request,
  key,
  start,
  stop,
  success,
  failure,
  cancelled,
  functionSuccess,
  functionFailure,
  timeout = API_TIMEOUT,
  cancel,
  /*uploadProgress, downloadProgress, intervalProgress=50, */ blob,
}) =>
  function* (action) {
    let args = action.args || [];
    const callback =
      typeof args[args.length - 1] === 'function'
        ? args[args.length - 1]
        : null;
    if (callback) {
      args = args.slice(0, -1);
    }
    let ret = null;
    let err = null;
    const requestKey = typeof key === 'function' ? key(...args) : key;
    if (start) {
      for (const actionCreator of start) {
        yield put(actionCreator());
      }
    }
    // mark pending
    yield put(markRequestPending(requestKey));
    try {
      // this is surely Error exception, assume as a request failed
      if (!request) {
        throw new Error('Api method not found!!!');
      }
      // start invoke
      const invokeRequest = async () => {
        const chainRequest = request.apply(request, args);
        const response = await chainRequest;
        console.log('response_________', response);
        if (response.ok) {
          return response.data;
        }
        return rejectErrors(response);
      };
      const raceOptions = {
        data: call(invokeRequest),
      };
      if (cancel) {
        raceOptions.cancelRet = take(cancel);
      }
      //chay race để thực hiện việc gọi request, timeout và cancel cái nào xong trước thì dừng lại
      const {data, isTimeout, cancelRet} = yield race(raceOptions);
      if (isTimeout) {
        throw new Error(`Api method is timeout after ${timeout} ms!!!`);
      } else if (cancelRet) {
        if (cancelled) {
          for (const actionCreator of cancelled) {
            yield put(actionCreator(cancelRet, action));
          }
        }
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        if (success) {
          for (const actionCreator of success) {
            yield put(actionCreator(data, action));
          }
        }
        if (functionSuccess) {
          for (const actionCreator of functionSuccess) {
            actionCreator(data);
          }
        }
        yield put(markRequestSuccess(requestKey));
        ret = data;
      }
    } catch (reason) {
      // console.log('reason', reason);

      if (failure) {
        for (const actionCreator of failure) {
          yield put(actionCreator(reason, action));
        }
      }
      if (functionFailure) {
        for (const actionCreator of functionFailure) {
          actionCreator(reason);
        }
      }
      yield put(markRequestFailed(reason, requestKey));

      //mark error
      err = reason;
    } finally {
      if (stop) {
        for (const actionCreator of stop) {
          yield put(actionCreator(ret, action));
        }
      }
      if (callback) {
        yield put(invokeCallback(callback, err, ret));
      }
    }
  };
