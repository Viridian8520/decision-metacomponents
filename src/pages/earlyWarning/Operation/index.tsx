/* @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Form, Select, InputNumber, Button } from 'antd';
import { firstLevelMenuEnum, earlyWarningStaffTFR, earlyWarningWealthTFR, earlyWarningConveyTFR, earlyWarningProductionTFR, earlyWarningSaleTFR } from '@/utils/constant';
import { useAppDispatch } from '@/states/hooks';
import { update, getEarlyWaring, getEarlyWaringOptionOnRedux, getEarlyWaringReturnOnRedux } from '../service';
import type { ReactElement } from "react";

const Operation = (props: { firstLevelPathKey: string }): ReactElement => {
  const { firstLevelPathKey } = props;
  const firstLevelPaths = Object.keys(firstLevelMenuEnum);
  enum categoriesEnum {
    'staff' = 1,
    'wealth' = 2,
    'convey' = 3,
    'production' = 4,
    'sale' = 5,
  }

  // 保存在redux的选择的预警数据以及其更新方法
  const { earlyWarningOption, updateOptionData } = getEarlyWaringOptionOnRedux(firstLevelPathKey);
  // 保存在redux的返回的预警数据以及其更新方法
  const { earlyWarningReturn, updateReturnData } = getEarlyWaringReturnOnRedux(firstLevelPathKey);

  const dispath = useAppDispatch();
  const [companyOptions, setCompanyOptions] = useState<{ value: string, label: string }[]>();  // 可选公司选项
  const [form] = Form.useForm();  // 表单实例

  // 渲染年份选择器
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    let options = [];
    for (let i = currentYear - 4; i <= currentYear + 4; i++) {
      const timestamp = new Date(i, 0, 1).getTime() / 1000;
      options.push({ value: timestamp, label: i });
    }
    return options;
  }

  // 年份选项
  const yearsOptions = generateYears();

  /**
   * 获取预警页各链阈值波动范围选项
   * @param firstLevelPathKey 当前一级路由路径
   * @returns 预警页各链阈值波动范围选项
   */
  const getTFR = (firstLevelPathKey: string): { value: string, label: string }[] => {
    switch (firstLevelPathKey) {
      case firstLevelPaths[0]:
        // 预警页人力链阈值波动范围选项
        return Object.keys(earlyWarningStaffTFR).map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[1]:
        // 预警页资金链阈值波动范围选项
        return Object.keys(earlyWarningWealthTFR).map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[2]:
        // 预警页物流链阈值波动范围选项
        return Object.keys(earlyWarningConveyTFR).map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[3]:
        // 预警页生产链阈值波动范围选项
        return Object.keys(earlyWarningProductionTFR).map(option => ({
          value: option,
          label: option,
        }));

      case firstLevelPaths[4]:
        // 预警页销售链阈值波动范围选项
        return Object.keys(earlyWarningSaleTFR).map(option => ({
          value: option,
          label: option,
        }));

      default:
        return [{ value: '', label: '' }]
    }
  }

  // 选择紧急程度变化的回调
  const onAlarmTypeChange = (alarmType: string) => {
    // 更新紧急程度并保存到redux
    const newEarlyWarningOption = {
      ...earlyWarningOption,
      alarmType,
    }
    dispath(updateOptionData(newEarlyWarningOption))
  }

  // 选择公司变化的回调
  const onCompanyChange = (company: string) => {
    // 更新选择的公司并保存到redux
    const newEarlyWarningOption = {
      ...earlyWarningOption,
      company,
    }
    dispath(updateOptionData(newEarlyWarningOption))
  }

  /**
   * 更新可选公司选项
   * @param returnData 请求返回的预警数据
   */
  const updateCompanyOption = (returnData: object) => {
    const companyOptions = Object.keys(returnData).map(option => ({
      value: option,
      label: option,
    }));
    setCompanyOptions(companyOptions);
  }

  // 阈值波动范围Select的输入搜索
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  /**
   * 请求预警数据
   * @param requestParams 请求参数
   */
  const requestEarlyWaring = (requestParams: {
    attributes: string,
    attributesValue: number,
    categories: number,
    granularity: string,
    time: number,
  }) => {
    const { attributes, attributesValue, categories, granularity, time, } = requestParams;
    // 1. 让后台更新数据
    update([{
      attributes,
      attributesValue,
      categories,
    }])

    // 2. 获取预警数据
    getEarlyWaring(firstLevelPathKey, { attributes, categories, granularity, time }).then((res: any) => {
      const returnData = res.data;

      // 更新可选公司选项
      updateCompanyOption(returnData);

      // 根据选择将预警数据保存到redux
      dispath(updateReturnData(returnData));
    });
  }

  /**
   * 点击生成预警按钮提交表单
   * @param value 表单数据
   */
  const onFinish = (value: any) => {
    // 将选择的预警数据保存到redux
    const optionData = {
      ...value,
      categories: categoriesEnum[firstLevelPathKey as keyof typeof categoriesEnum],
    }
    dispath(updateOptionData(optionData));

    // 请求参数
    const requestParams = {
      attributes: value.attributes,
      attributesValue: value.attributesValue,
      categories: categoriesEnum[firstLevelPathKey as keyof typeof categoriesEnum],
      granularity: value.granularity,
      time: value.time,
    }
    // 请求预警数据
    requestEarlyWaring(requestParams);
  }

  useEffect(() => {
    // 拿到redux的缓存
    if (earlyWarningOption === undefined) {
      // 初始化
      const requestParams = {
        attributes: getTFR(firstLevelPathKey)[0].label,
        attributesValue: 100,
        categories: categoriesEnum[firstLevelPathKey as keyof typeof categoriesEnum],
        granularity: '1',
        time: yearsOptions[4].value,
      };  // 请求参数
      requestEarlyWaring(requestParams);  // 请求预警数据
      form.resetFields();  // 如果缓存为空，则清空表单数据，防止xx链的选项展示在yy链上
    } else {
      if (earlyWarningReturn !== undefined) {
        // 更新可选公司选项
        updateCompanyOption(earlyWarningReturn);
      }
      form.setFieldsValue(earlyWarningOption);
    }
  }, [firstLevelPathKey])

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}
      >
        <div>
          请选择要查询的周期于年份：
          <Form.Item
            name='granularity'
            initialValue='1'
            css={{
              display: 'inline-block',
              margin: 0,
              marginRight: '5px',
              width: '100px',
            }}
          >
            <Select
              options={[
                {
                  value: '1',
                  label: '年',
                },
                {
                  value: '2',
                  label: '季度',
                },
                {
                  value: '3',
                  label: '月',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name='time'
            initialValue={yearsOptions[4].value}
            css={{
              display: 'inline-block',
              margin: 0,
              width: '100px',
            }}
          >
            <Select
              options={yearsOptions}
            />
          </Form.Item>
        </div>
        <div>
          请选择或搜索预警阈值波动范围：
          <Form.Item
            name='attributes'
            css={{
              display: 'inline-block',
              margin: 0,
              width: '100px',
            }}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={getTFR(firstLevelPathKey)}
            />
          </Form.Item>
        </div>
        <div>
          请输入阈值：
          <Form.Item
            name='attributesValue'
            initialValue={100}
            css={{
              display: 'inline-block',
              margin: 0,
              width: '100px',
            }}
          >
            <InputNumber />
          </Form.Item>
        </div>
        <div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              生成预警
            </Button>
          </Form.Item>
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          margin: '10px 0',
        }}
      >
        <>
          <div>
            请选择公司：
            <Form.Item
              name='company'
              css={{
                display: 'inline-block',
                margin: 0,
                width: '100px',
              }}
            >
              <Select
                value={earlyWarningOption?.company}
                options={companyOptions}
                onChange={company => { onCompanyChange(company) }}
              />
            </Form.Item>
          </div>
          <div>
            高/低于预警：
            <Form.Item
              name='alarmType'
              initialValue={2}
              css={{
                display: 'inline-block',
                margin: 0,
                width: '100px',
              }}
            >
              <Select
                options={[
                  {
                    value: 2,
                    label: '全部',
                  },
                  {
                    value: 1,
                    label: '高于预警',
                  },
                  {
                    value: 0,
                    label: '低于预警',
                  },
                ]}
                onChange={alarmType => { onAlarmTypeChange(alarmType) }}
              />
            </Form.Item>
          </div>
        </>
      </div>
    </Form>
  )
}

export default Operation;