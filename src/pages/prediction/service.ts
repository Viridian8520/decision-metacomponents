import axios from 'axios'
import { PredictionParams } from './type';

export const getStaffPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53:8080/rest/decision/element/staff/prediction/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});

export const getWealthPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53:8080/rest/decision/element/wealth/prediction/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});

export const getConveyPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53:8080/rest/decision/element/convey/prediction/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});

export const getProductionPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53:8080/rest/decision/element/production/prediction/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});

export const getSalePrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53:8080/rest/decision/element/sale/prediction/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});
