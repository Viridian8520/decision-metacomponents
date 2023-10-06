export interface DecisionParams {
  time: number, // 时间参数
  granularity: number, // 时间粒度参数
  categories: number, // 1为人力链、2为资金链，以此类推
  attributes: string,
}
