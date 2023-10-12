import { Table } from 'antd';
import { translateAlarmType, translateAttributes } from '@/utils/translate';
import { getEarlyWaringOptionOnRedux, getEarlyWaringReturnOnRedux } from '../service';
import type { ReactElement } from "react";

const TableElement = (props: { firstLevelPathKey: string }): ReactElement => {
  const { firstLevelPathKey } = props;

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

  // 翻译后的英文预警波动范围
  const attributesResult = translateAttributes(firstLevelPathKey, attributes);

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