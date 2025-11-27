import { create } from 'apisauce';
import { API_TIMEOUT, END_POINT, END_POINT_EDUBIT } from '../../constants/api';
// export const APP_COURSES_ME = 'app/courseMe';
// Create base http request use apisauce - base from axios -- https://github.com/infinitered/apisauce
const API = create({
  baseURL: END_POINT,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const API_EDUBIT = create({
  baseURL: END_POINT_EDUBIT,
  timeout: API_TIMEOUT,
  headers: {
    'Accept-Language': 'vi',
    'Content-Type': 'application/json',
  },
});
const API_REFRESH_TOKEN = create({
  baseURL: END_POINT_EDUBIT,
  timeout: API_TIMEOUT,
  headers: {
    'Accept-Language': 'vi',
    'Content-Type': 'application/json',
  },
});
const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlaWQiOiI1Zjc3ZTkxZDA2ZWQzZjIxNzY2YmU4YzEiLCJ0aW1lIjoxNjAxNjk1OTA3fQ.xmAEctqPv2cjeBT4XSF9zoKS8vLl3wkzEbB98bxnM3Y`;
// const site_id = '6209ff034108d3ff658b456c'; //edubit
const site_id = '68be9ea2929ddf5ba81a874b'; //thanhnga

export { API, API_EDUBIT, API_REFRESH_TOKEN, token, site_id };
