import axios from 'axios'
import { DecisionParams } from './type';

export const getStaffDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/rest/decision/element/staff/measure/query',
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

export const getWealthDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/rest/decision/element/wealth/measure/query',
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

export const getConveyDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/rest/decision/element/convey/measure/query',
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

export const getProductionDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/rest/decision/element/production/measure/query',
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

export const getSaleDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/rest/decision/element/sale/measure/query',
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
