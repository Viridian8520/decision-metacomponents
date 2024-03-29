/* @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { ConfigProvider, Pagination } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Charts } from "@/components/Charts";
import { firstLevelMenuEnum } from '@/utils/constant';
import { translateAttributes } from '@/utils/translate';
import { center_flex } from '@/utils/commonStyles';
import { getEarlyWaringOptionOnRedux, getEarlyWaringReturnOnRedux } from "../service";
import type { ReactElement } from "react";
import type { EChartOption } from "echarts";
import type { PaginationProps } from 'antd';

const BarChart = (props: { firstLevelPathKey: string }): ReactElement => {
  const { firstLevelPathKey } = props;
  const firstLevelPaths = Object.keys(firstLevelMenuEnum);
  const firstLevelPathValue = firstLevelMenuEnum[firstLevelPathKey as keyof typeof firstLevelMenuEnum];

  // 保存在redux的选择的预警数据
  const { earlyWarningOption } = getEarlyWaringOptionOnRedux(firstLevelPathKey);
  // 保存在redux的返回的预警数据
  const { earlyWarningReturn } = getEarlyWaringReturnOnRedux(firstLevelPathKey);

  // 选择的预警阈值波动范围
  const attributes = earlyWarningOption?.attributes
  // 翻译后的英文预警波动范围
  const attributesResult = translateAttributes(firstLevelPathKey, attributes);
  // 选择的预警紧急程度
  const alarmTypeOption = earlyWarningOption?.alarmType ?? 2;

  // 柱状图数据
  const [YAxisData, setYAxisData] = useState<any[]>([]);
  const [SeriesData, setSeriesData] = useState<any[]>([]);
  const [YAxisDataCurrent, setYAxisDataCurrent] = useState<any[]>([]);  // 当前页柱状图数据
  const barChartHeight: number = YAxisDataCurrent.length > 20 ? YAxisDataCurrent.length * 20 : 400;

  // 柱状图分页器配置
  const defaultCurrent = 1;  // 默认的当前页码
  const defaultPageSize = 10;  // 默认的每页条数
  const [current, setCurrent] = useState<number>(defaultCurrent);  // 当前页码
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);  // 每页条数

  // 格式化事件时间戳
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
    const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0
    const day: any = (date.getDate() + 1).toString().padStart(2, '0');

    if (earlyWarningOption?.granularity === '1') {
      return `第${Math.floor((month - 1) / 3) + 1}季度`;
    } else if (earlyWarningOption?.granularity === '2') {
      return `${month}月`;
    } else if (earlyWarningOption?.granularity === '3') {
      return `${day}日`;
    } else {
      return '无';
    }
  }

  /**
   * 获取柱状图数据
   * @param firstLevelPathKey  当前一级路由路径
   * @param companyData 选择的公司数据
   * @returns 柱状图横纵坐标数据
   */
  const getChartData = (firstLevelPathKey: string, companyData: { [key: string]: any }[]) => {
    const yAxisData: any[] = [];
    const seriesData: any[] = [];

    const REDCOLOR = '#C83325';
    const BLUECOLOR = '#4EA1FE';

    switch (firstLevelPathKey) {
      case firstLevelPaths[0]:  // 预警页人力链
        companyData?.forEach(item => {
          // 当数据不为空再更新，并根据紧急程度过滤
          if (item.skill && item[attributesResult] && (alarmTypeOption === item['alarmType'] || alarmTypeOption === 2)) {
            yAxisData.push(item.skill);
            seriesData.push({
              value: item[attributesResult],
              itemStyle: {
                color: item.level === 2 ? REDCOLOR : BLUECOLOR
              }
            });
          }
        })
        break;

      case firstLevelPaths[1]:  // 预警页资金链
        companyData?.forEach(item => {
          // 当数据不为空再更新，并根据紧急程度过滤
          if (item.eventTime && item[attributesResult] && (alarmTypeOption === item['alarmType'] || alarmTypeOption === 2)) {
            yAxisData.push(formatDate(item.eventTime));
            seriesData.push({
              value: item[attributesResult],
              itemStyle: {
                color: item.level === 2 ? REDCOLOR : BLUECOLOR
              }
            });
          }
        })
        break;

      case firstLevelPaths[2]:  // 预警页物流链
      case firstLevelPaths[3]:  // 预警页生产链
      case firstLevelPaths[4]:  // 预警页销售链
        companyData?.forEach(item => {
          // 当数据不为空再更新，并根据紧急程度过滤
          if (item.eventTime && item.categories && item[attributesResult] && (alarmTypeOption === item['alarmType'] || alarmTypeOption === 2)) {
            yAxisData.push(`${formatDate(item.eventTime)}/商品类型：${item.categories}`);
            seriesData.push({
              value: item[attributesResult],
              itemStyle: {
                color: item.level === 2 ? REDCOLOR : BLUECOLOR
              }
            });
          }
        })
        break;

      default: break;
    }

    return { yAxisData, seriesData }
  }

  /**
   * 分页器 页码 或 每页条数 改变的回调
   * @param page 改变后的页码
   * @param pageSize 改变后的每页条数
   */
  const paginationOnChange: PaginationProps['onChange'] = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    setYAxisDataCurrent(YAxisData.slice(pageSize * (page - 1), pageSize * page));
  }

  // 柱状图配置
  const barChartOption: EChartOption = {
    yAxis: {
      type: 'category',
      data: YAxisDataCurrent
    },
    xAxis: {
      type: 'value'
    },
    series: [
      {
        data: SeriesData,
        type: 'bar',
      }
    ],
    title: {
      text: `${firstLevelPathValue}${attributes}告警信息`,
      left: 'center',
      bottom: '0',
    },
    tooltip: {
      trigger: 'axis',
    },
  }

  useEffect(() => {
    if (earlyWarningReturn !== undefined && earlyWarningOption?.company !== undefined) {
      // 获取柱状图数据并更新
      const { yAxisData, seriesData } = getChartData(firstLevelPathKey, earlyWarningReturn[earlyWarningOption.company]);
      setYAxisData(yAxisData);
      setSeriesData(seriesData);
      setYAxisDataCurrent(yAxisData.slice(0, defaultPageSize));
      // 重置页码数和每页条数
      setCurrent(defaultCurrent);
      setPageSize(defaultPageSize);
    } else {
      // 如果缓存为空，则清空柱状图数据，防止xx链的柱状图数据展示在yy链上
      setYAxisData([]);
      setSeriesData([]);
      setYAxisDataCurrent([]);
    }
  }, [earlyWarningReturn, earlyWarningOption])

  return (
    <div
      css={{
        marginBottom: '40px',
      }}
    >
      {
        YAxisData.length !== 0 && SeriesData.length !== 0 && <>
          <Charts
            options={barChartOption}
            style={{
              height: `${barChartHeight}px`,
            }}
          />
          <ConfigProvider locale={zhCN}>
            <Pagination
              defaultCurrent={defaultCurrent}
              defaultPageSize={defaultPageSize}
              current={current}
              pageSize={pageSize}
              total={YAxisData.length}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `总共为 ${total} 项`}
              onChange={paginationOnChange}
              css={{
                ...center_flex,
              }}
            />
          </ConfigProvider>
        </>
      }
    </div>
  )
}

export default BarChart;