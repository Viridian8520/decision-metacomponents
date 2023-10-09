// 一级菜单
export enum firstLevelMenuEnum {
  'manpowerChain' = '人力链',
  'capitalChain' = '资金链',
  'logisticsChain' = '物流链',
  'productionChain' = '生产链',
  'distributionChain' = '销售链',
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
