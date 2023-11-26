// 一级菜单
export enum firstLevelMenuEnum {
  'staff' = '人力链',
  'wealth' = '资金链',
  'convey' = '物流链',
  'production' = '生产链',
  'sale' = '销售链',
}

// 二级菜单
export enum secondaryMenuEnum {
  'prediction' = '预测',
  'earlyWarning' = '预警',
  'decisionMaking' = '决策',
}

//翻译参照表
export const translationTable: any = {
  '人员数量': 'amount',
  '研发费用': 'research',
  '设备费用': 'device',
  '生产费用': 'production',
  '仓储费用': 'storage',
  '物料费用': 'materiel',
  '运输费用': 'transportation',
  '人工费用': 'salary',
  '利润': 'profit',
  '流动资产': 'cashAssets',
  '融资': 'finance',
  '运输数量': 'quantity',
  '运输剩余库存': 'inventory',
  '运输里程数': 'mileage',
  // '运输费用': 'cost',
  '生产产量': 'quantity',
  // '生产费用': 'cost',
  '产品销量': 'quantity',
  '销售营收': 'income',
  '销售费用': 'cost',
  '产品库存': 'inventory',
  '销售服务': 'score'
}

// 预警页左上角标题
export enum earlyWarningTitle {
  'staff' = '人力链预警情况',
  'wealth' = '资金链预警情况',
  'convey' = '物流链预警情况',
  'production' = '生产链预警情况',
  'sale' = '销售链预警情况',
}

// 预警页人力链阈值波动范围
export enum earlyWarningStaffTFR {
  '人员数量' = 'amount',
}

// 预警页资金链阈值波动范围
export enum earlyWarningWealthTFR {
  '研发费用' = 'research',
  '设备费用' = 'device',
  '生产费用' = 'production',
  '仓储费用' = 'storage',
  '物料费用' = 'materiel',
  '运输费用' = 'transportation',
  '人工费用' = 'salary',
  '利润' = 'profit',
  '流动资产' = 'cashAssets',
  '融资' = 'finance',
}

// 预警页物流链阈值波动范围
export enum earlyWarningConveyTFR {
  '运输数量' = 'quantity',
  '运输剩余库存' = 'inventory',
  '运输里程数' = 'mileage',
  '运输费用' = 'transportation',
}

// 预警页生产链阈值波动范围
export enum earlyWarningProductionTFR {
  '生产产量' = 'quantity',
  '生产费用' = 'production',
}

// 预警页销售链阈值波动范围
export enum earlyWarningSaleTFR {
  '产品销量' = 'quantity',
  '销售营收' = 'income',
  '销售费用' = 'cost',
  '产品库存' = 'inventory',
  '销售服务' = 'score',
}