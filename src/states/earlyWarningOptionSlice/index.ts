import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EarlyWarningOptionData {
  alarmType?: number,  // 紧急程度（如：1代表高于预警）
  attributes?: string,  // 阈值波动范围
  attributesValue?: number,  // 阈值
  categories?: number,  // xx链（如：1代表人力链）
  company?: string,  // 公司
  granularity?: string,  // 周期（如：1代表年）
  time?: number,  // 根据年份生成的时间戳
}

interface EarlyWarningOption {
  staff?: EarlyWarningOptionData,
  wealth?: EarlyWarningOptionData,
  convey?: EarlyWarningOptionData,
  production?: EarlyWarningOptionData,
  sale?: EarlyWarningOptionData,
}

const initialState: EarlyWarningOption = {};

export const earlyWarningOptionSlice = createSlice({
  name: 'earlyWarningOption',
  initialState,
  reducers: {
    updateStaffOptionData: (state, action: PayloadAction<EarlyWarningOptionData>) => {
      state.staff = action.payload;
    },
    updateWealthOptionData: (state, action: PayloadAction<EarlyWarningOptionData>) => {
      state.wealth = action.payload;
    },
    updateConveyOptionData: (state, action: PayloadAction<EarlyWarningOptionData>) => {
      state.convey = action.payload;
    },
    updateProductionOptionData: (state, action: PayloadAction<EarlyWarningOptionData>) => {
      state.production = action.payload;
    },
    updateSaleOptionData: (state, action: PayloadAction<EarlyWarningOptionData>) => {
      state.sale = action.payload;
    },
  }
})

export const { updateStaffOptionData, updateWealthOptionData, updateConveyOptionData, updateProductionOptionData, updateSaleOptionData } = earlyWarningOptionSlice.actions;

export default earlyWarningOptionSlice.reducer;