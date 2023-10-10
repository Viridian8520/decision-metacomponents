import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EarlyWarningReturnData {
  [key: string]: {
    categories?: number,  // 种类
    [key: string]: any,  // 阈值波动范围
    causeType?: string,  // 原因
    level?: number,  // 紧急情况
    // measures?: string,  // 决策措施
  }[]
}

interface EarlyWarningReturn {
  staff?: EarlyWarningReturnData,
  wealth?: EarlyWarningReturnData,
  convey?: EarlyWarningReturnData,
  production?: EarlyWarningReturnData,
  sale?: EarlyWarningReturnData,
}

const initialState: EarlyWarningReturn = {};

export const earlyWarningReturnSlice = createSlice({
  name: 'earlyWarningReturn',
  initialState,
  reducers: {
    updateStaffReturnData: (state, action: PayloadAction<EarlyWarningReturnData>) => {
      state.staff = action.payload;
    },
    updateWealthReturnData: (state, action: PayloadAction<EarlyWarningReturnData>) => {
      state.wealth = action.payload;
    },
    updateConveyReturnData: (state, action: PayloadAction<EarlyWarningReturnData>) => {
      state.convey = action.payload;
    },
    updateProductionReturnData: (state, action: PayloadAction<EarlyWarningReturnData>) => {
      state.production = action.payload;
    },
    updateSaleReturnData: (state, action: PayloadAction<EarlyWarningReturnData>) => {
      state.sale = action.payload;
    },
  }
})

export const { updateStaffReturnData, updateWealthReturnData, updateConveyReturnData, updateProductionReturnData, updateSaleReturnData } = earlyWarningReturnSlice.actions;

export default earlyWarningReturnSlice.reducer;