import { Table } from 'antd';
import { firstLevelMenuEnum, earlyWarningStaffTFR, earlyWarningWealthTFR, earlyWarningConveyTFR, earlyWarningProductionTFR, earlyWarningSaleTFR } from '@/utils/constant';
import { getEarlyWaringOptionOnRedux, getEarlyWaringReturnOnRedux } from '../service';
import type { ReactElement } from "react";

const TableElement = (props: { firstLevelPathKey: string }): ReactElement => {
  const { firstLevelPathKey } = props;
  const firstLevelPaths = Object.keys(firstLevelMenuEnum);

  // 保存在redux的选择的预警数据
  const { earlyWarningOption } = getEarlyWaringOptionOnRedux(firstLevelPathKey);
  // 保存在redux的返回的预警数据
  const { earlyWarningReturn = {} } = getEarlyWaringReturnOnRedux(firstLevelPathKey);

  // 选择的预警紧急程度
  const alarmTypeOption = earlyWarningOption?.alarmType ?? 2;
  // 选择的预警阈值波动范围
  const attributes = earlyWarningOption?.attributes;
  // 选择的公司
  const company = earlyWarningOption?.company;
  // 保存在redux上的预警请求返回的数据
  // const returnAllData = useAppSelector(state => state.earlyWarningReturn.data) || {};

  /**
   * 翻译紧急程度
   * @param alarmType 紧急程度对应的数字
   * @returns 紧急程度对应的文字
   */
  const translateAlarmType = (alarmType: number): string => {
    switch (alarmType) {
      case 1:
        return '一般';
      case 2:
        return '紧急';
      default:
        return '';
    }
  }

  /**
   * 翻译选择的预警阈值波动范围
   * @param firstLevelPathKey 当前一级路由路径
   * @returns 选择的预警阈值波动范围的英文
   */
  const translateAttributes = (firstLevelPathKey: string): string => {
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

  const attributesResult = translateAttributes(firstLevelPathKey);  // 翻译后的英文预警波动范围

  // 表格列
  const columns = [
    {
      title: '种类',
      dataIndex: 'categories',
      key: 'categories',
    },
    {
      title: attributes,
      dataIndex: attributesResult,
      key: attributesResult,
    },
    {
      title: '原因',
      dataIndex: 'causeType',
      key: 'causeType',
    },
    {
      title: '紧急程度',
      dataIndex: 'level',
      key: 'level',
    },
  ];

  const tableNeedProperties = columns.map(({ key }) => key);  // 表格列所需要的数据项
  const tableNeedData: {}[] = [];  // 表格需要的数据

  // 处理表格数据
  if (company !== undefined) {
    earlyWarningReturn[company]?.forEach((item, index) => {
      const newObj: {
        categories?: string,  // 种类
        [key: string]: any,  // 阈值波动范围
        causeType?: string,  // 原因
        level?: string | number,  // 紧急程度
        // measures?: string,  // 决策措施
      } = {};
      let isFilterAlarmTypeOption = false;  // 是否通过紧急程度过滤
      for (const prop of tableNeedProperties) {
        // 根据紧急程度过滤
        if (item.hasOwnProperty(prop) && (alarmTypeOption === item['alarmType'] || alarmTypeOption === 2)) {
          if (prop === 'level') {
            isFilterAlarmTypeOption = true;
            // 翻译紧急程度
            const levelResult = translateAlarmType(item['level'] as number);
            newObj['level'] = levelResult;
          } else {
            newObj[prop] = item[prop];
          }
        }
      }
      // 消除警告：Warning: Each child in a list should have a unique "key" prop.
      newObj['key'] = index;
      // 未通过紧急程度过滤，不展示数据
      isFilterAlarmTypeOption && tableNeedData.push(newObj);
    })
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableNeedData}
      />
    </>
  )
}

export default TableElement;