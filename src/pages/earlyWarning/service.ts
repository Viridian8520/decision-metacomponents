import axios from 'axios';
import { firstLevelMenuEnum } from '@/utils/constant';
import { useAppSelector } from '@/states/hooks';
import { updateStaffOptionData, updateWealthOptionData, updateConveyOptionData, updateProductionOptionData, updateSaleOptionData } from '@/states/earlyWarningOptionSlice';
import { updateStaffReturnData, updateWealthReturnData, updateConveyReturnData, updateProductionReturnData, updateSaleReturnData } from '@/states/earlyWarningReturnSlice';
import type { EarlyWarningOptionData } from '@/states/earlyWarningOptionSlice';
import type { EarlyWarningReturnData } from '@/states/earlyWarningReturnSlice';

const firstLevelPaths = Object.keys(firstLevelMenuEnum);

export const update = (data: any) => new Promise(async (resolve, reject) => {
  try {
    const res = await axios({
      method: 'post',
      url: `http://8.134.59.53:8080/rest/decision/element/threshold/action/update`,
      data,
    });
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  } catch (err) {
    console.log(err);
  }
});

// 生成预警
export const getEarlyWaring = (type: string, params: any) => new Promise(async (resolve, reject) => {
  try {
    const res = await axios({
      method: 'get',
      url: `http://8.134.59.53:8080/rest/decision/element/${type}/warning/query`,
      params,
    });
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  } catch (err) {
    console.log(err);
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

/**
 * 获取保存在redux的返回的预警数据以及其更新方法
 * @param firstLevelPathKey 当前一级路由路径
 * @return 保存在redux的返回的预警数据以及其更新方法
 */
export const getEarlyWaringReturnOnRedux = (firstLevelPathKey: string): {
  earlyWarningReturn: EarlyWarningReturnData | undefined,
  updateReturnData: Function,
} => {
  // 保存在redux的选择的预警数据以及其更新方法
  let earlyWarningReturn: EarlyWarningReturnData | undefined = {};
  let updateReturnData: Function;

  switch (firstLevelPathKey) {
    case firstLevelPaths[0]:
      // 预警页人力链
      earlyWarningReturn = useAppSelector(state => state.earlyWarningReturn[firstLevelPaths[0] as keyof typeof state.earlyWarningReturn]);
      updateReturnData = updateStaffReturnData;
      break;

    case firstLevelPaths[1]:
      // 预警页资金链
      earlyWarningReturn = useAppSelector(state => state.earlyWarningReturn[firstLevelPaths[1] as keyof typeof state.earlyWarningReturn]);
      updateReturnData = updateWealthReturnData;
      break;

    case firstLevelPaths[2]:
      // 预警页物流链
      earlyWarningReturn = useAppSelector(state => state.earlyWarningReturn[firstLevelPaths[2] as keyof typeof state.earlyWarningReturn]);
      updateReturnData = updateConveyReturnData;
      break;

    case firstLevelPaths[3]:
      // 预警页生产链
      earlyWarningReturn = useAppSelector(state => state.earlyWarningReturn[firstLevelPaths[3] as keyof typeof state.earlyWarningReturn]);
      updateReturnData = updateProductionReturnData;
      break;

    case firstLevelPaths[4]:
      // 预警页销售链
      earlyWarningReturn = useAppSelector(state => state.earlyWarningReturn[firstLevelPaths[4] as keyof typeof state.earlyWarningReturn]);
      updateReturnData = updateSaleReturnData;
      break;

    default:
      earlyWarningReturn = {};
      updateReturnData = () => { };
  }

  return {
    earlyWarningReturn,
    updateReturnData,
  }
}