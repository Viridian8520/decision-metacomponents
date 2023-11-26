/* @jsxImportSource @emotion/react */
import { Button, Form, Select, Table } from 'antd';
import { Fragment, type FC, type ReactElement, useState, useRef } from 'react';
import { getStaffPrediction } from './service';

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

const options = generateYears();

const staff: FC = (): ReactElement => {
  const granularity = useRef();
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: '单位名称',
      dataIndex: 'corporation',
      key: 'corporation',
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
    },
    {
      title: '技能',
      dataIndex: 'skill',
      key: 'skill',
    },
    {
      title: '时间',
      dataIndex: 'eventTime',
      key: 'eventTime',
      render: (text: number) => {
        const date: string = formatDate(text);
        return <span style={{ color: isFutureTime(text) ? "rgb(64, 149, 229)" : "rgba(0, 0, 0, 0.88)" }}>{date}</span>
      }
    },
    {
      title: '人数',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  // 格式化事件时间戳
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
    const year = date.getFullYear();
    const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0

    if (granularity.current === 1) {
      return `${year}`;
    } else if (granularity.current === 2) {
      return `第${Math.floor((month - 1) / 3) + 1}季度`;
    } else if (granularity.current === 3) {
      return `${month}月`;
    } else {
      return '无';
    }
  }

  const isFutureTime = (timestamp: number) => {
    const currentTimestamp = Math.floor(Date.now() / 1000); // 当前时间戳（单位：秒）
    return timestamp > currentTimestamp;
  }

  const onFinish = (values: any) => {
    granularity.current = values.granularity;
    const params = {
      ...values,
      offset: 0,
      limit: 999,
    }
    getStaffPrediction(params).then((res: any) => {
      setDataSource(res.data.staff);
    })
  }

  return (
    <Fragment>
      <div
        css={{
          position: 'relative'
        }}
      >
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            padding: '0 20px',
            left: '0',
            border: '1px solid #d4d4d4',
            fontSize: '16px',
            lineHeight: '36px',
            color: '#1677ff',
          }}
        >
          人力链预测情况
        </div>
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            lineHeight: '36px',
            right: '0',
          }}
        >
          <span>请选择要查询的周期与年份：</span>
          <Form
            layout="inline"
            // initialValues={{ granularity: 1, time: 1690946777 }}
            onFinish={onFinish}
            css={{
              display: 'inline-flex'
            }}
          >
            <Form.Item
              name="granularity"
            >
              <Select
                css={{
                  width: '70px !important',
                }}
              >
                <Select.Option value={1}>年</Select.Option>
                <Select.Option value={2}>季度</Select.Option>
                <Select.Option value={3}>月</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="time"
            >
              <Select
                css={{
                  width: '80px !important',
                }}
                options={options}
              >
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        css={{
          textAlign: 'right',
          position: 'relative',
          top: '50px',
        }}
      >
        <span
          css={{
            marginRight: '320px'
          }}
        >
          ■当前值
        </span>
        <span css={{
          color: 'rgb(64, 149, 229)',
        }}
        >
          ■下一阶段预测值
        </span>
      </div>
      <div
        css={{
          position: 'relative',
          top: '65px',
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </div>
    </Fragment>
  )
}

export default staff;