import { firstLevelMenuEnum, earlyWarningStaffTFR, earlyWarningWealthTFR, earlyWarningConveyTFR, earlyWarningProductionTFR, earlyWarningSaleTFR } from '@/utils/constant';

const firstLevelPaths = Object.keys(firstLevelMenuEnum);

/**
 * 翻译紧急程度
 * @param alarmType 紧急程度对应的数字
 * @returns 紧急程度对应的文字
 */
export const translateAlarmType = (alarmType: number | string): string => {
  switch (alarmType) {
    case 1:
    case '1':
      return '一般';
    case 2:
    case '2':
      return '紧急';
    default:
      return '';
  }
}

/**
 * 翻译选择的预警阈值波动范围
 * @param firstLevelPathKey 当前一级路由路径
 * @param attributes 选择的预警阈值波动范围
 * @returns 选择的预警阈值波动范围的英文
 */
export const translateAttributes = (firstLevelPathKey: string, attributes: string | undefined): string => {
  switch (firstLevelPathKey) {
    case firstLevelPaths[0]:
      // 预警页人力链阈值波动范围选项
      return earlyWarningStaffTFR[attributes as keyof typeof earlyWarningStaffTFR];

    case firstLevelPaths[1]:
      // 预警页资金链阈值波动范围选项
      return earlyWarningWealthTFR[attributes as keyof typeof earlyWarningWealthTFR];

    case firstLevelPaths[2]:
      // 预警页物流链阈值波动范围选项
      return earlyWarningConveyTFR[attributes as keyof typeof earlyWarningConveyTFR];

    case firstLevelPaths[3]:
      // 预警页生产链阈值波动范围选项
      return earlyWarningProductionTFR[attributes as keyof typeof earlyWarningProductionTFR];

    case firstLevelPaths[4]:
      // 预警页销售链阈值波动范围选项
      return earlyWarningSaleTFR[attributes as keyof typeof earlyWarningSaleTFR];

    default:
      return '';
  }
}