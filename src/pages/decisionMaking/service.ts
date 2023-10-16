import axios from 'axios'
import { DecisionParams } from './type';
import { firstLevelMenuEnum } from '@/utils/constant';
import { useAppSelector } from '@/states/hooks';
import { updateStaffOptionData, updateWealthOptionData, updateConveyOptionData, updateProductionOptionData, updateSaleOptionData } from '@/states/earlyWarningOptionSlice';
// import { updateStaffReturnData, updateWealthReturnData, updateConveyReturnData, updateProductionReturnData, updateSaleReturnData } from '@/states/earlyWarningReturnSlice';
import type { EarlyWarningOptionData } from '@/states/earlyWarningOptionSlice';
import { message } from 'antd';
// import type { EarlyWarningReturnData } from '@/states/earlyWarningReturnSlice';

const firstLevelPaths = Object.keys(firstLevelMenuEnum);

export const getStaffDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  if (params.attributes === undefined) {
    message.info('生成决策前请先到对应链的预警界面生成预警！');
  } else {
    return axios({
      method: 'get',
      url: 'http://8.134.59.53:8080/rest/decision/element/staff/measure/query',
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
  }
});

export const getWealthDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  if (params.attributes === undefined) {
    message.info('生成决策前请先到对应链的预警界面生成预警！');
  } else {
    return axios({
      method: 'get',
      url: 'http://8.134.59.53:8080/rest/decision/element/wealth/measure/query',
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
  }
});

export const getConveyDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  if (params.attributes === undefined) {
    message.info('生成决策前请先到对应链的预警界面生成预警！');
  } else {
    return axios({
      method: 'get',
      url: 'http://8.134.59.53:8080/rest/decision/element/convey/measure/query',
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
  }
});

export const getProductionDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  if (params.attributes === undefined) {
    message.info('生成决策前请先到对应链的预警界面生成预警！');
  } else {
    return axios({
      method: 'get',
      url: 'http://8.134.59.53:8080/rest/decision/element/production/measure/query',
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
  }
});

export const getSaleDecision = (params: DecisionParams) => new Promise((resolve, reject) => {
  if (params.attributes === undefined) {
    message.info('生成决策前请先到对应链的预警界面生成预警！');
  } else {
    return axios({
      method: 'get',
      url: 'http://8.134.59.53:8080/rest/decision/element/sale/measure/query',
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
  }
});

/**
 * 获取保存在redux的选择的预警数据以及其更新方法
 * @param firstLevelPathKey 当前一级路由路径
 * @return 保存在redux的选择的预警数据以及其更新方法
 */
export const getEarlyWaringOptionOnRedux = (firstLevelPathKey: string): {
  earlyWarningOption: EarlyWarningOptionData | undefined,
  updateOptionData: Function,
} => {
  // 保存在redux的选择的预警数据以及其更新方法
  let earlyWarningOption: EarlyWarningOptionData | undefined = {};
  let updateOptionData: Function;

  switch (firstLevelPathKey) {
    case firstLevelPaths[0]:
      // 预警页人力链
      earlyWarningOption = useAppSelector(state => state.earlyWarningOption[firstLevelPaths[0] as keyof typeof state.earlyWarningOption]);
      updateOptionData = updateStaffOptionData;
      break;

    case firstLevelPaths[1]:
      // 预警页资金链
      earlyWarningOption = useAppSelector(state => state.earlyWarningOption[firstLevelPaths[1] as keyof typeof state.earlyWarningOption]);
      updateOptionData = updateWealthOptionData;
      break;

    case firstLevelPaths[2]:
      // 预警页物流链
      earlyWarningOption = useAppSelector(state => state.earlyWarningOption[firstLevelPaths[2] as keyof typeof state.earlyWarningOption]);
      updateOptionData = updateConveyOptionData;
      break;

    case firstLevelPaths[3]:
      // 预警页生产链
      earlyWarningOption = useAppSelector(state => state.earlyWarningOption[firstLevelPaths[3] as keyof typeof state.earlyWarningOption]);
      updateOptionData = updateProductionOptionData;
      break;

    case firstLevelPaths[4]:
      // 预警页销售链
      earlyWarningOption = useAppSelector(state => state.earlyWarningOption[firstLevelPaths[4] as keyof typeof state.earlyWarningOption]);
      updateOptionData = updateSaleOptionData;
      break;

    default:
      earlyWarningOption = {};
      updateOptionData = () => { };
  }

  return {
    earlyWarningOption,
    updateOptionData,
  }
}