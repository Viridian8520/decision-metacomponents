/* @jsxImportSource @emotion/react */
import { Button, Form, Table } from 'antd';
import { Fragment, type FC, type ReactElement, useState } from 'react';
import { getWealthDecision } from './service';
import { EChartOption } from "echarts";
import { Charts } from "@/components/Charts";
import { translationTable } from '@/utils/constant';
import { deepClone } from '@/utils/objectUtils';

const corporationOption: EChartOption = {
  title: {
    text: '决策对象',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 14,
      fontWeight: "normal"
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    // data: []
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      // data: []
    }
  ]
};

const levelOption: EChartOption = {
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '紧急程度',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 14,
      fontWeight: "normal"
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    // data: []
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      // data: []
    }
  ]
};

const measureOption: EChartOption = {
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '决策措施',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 14,
      fontWeight: "normal"
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    // data: []
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      // data: []
    }
  ]
};

const topoOption: EChartOption = {
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      name: 'Topo',
      type: 'graph',
      layout: 'force',
      // data: graph.nodes,
      // links: graph.links,
      label: {
        show: true,
        position: "inside",
        distance: 5,
        fontSize: 12,
        align: "center",
      },
      symbolSize: 90,
      roam: true,
      edgeSymbol: ["circle", "arrow"],
      force: { // 节点排斥力设置
        repulsion: 200,
        gravity: 0,
        edgeLength: 200
      },
      itemStyle: {
        normal: { // 不同节点显示不同颜色
          color: function (params: any) {
            return params.data.colors || '#5470c6'; // 获取具体的参数，默认为蓝色
          },
        }
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3 // 线的曲率
      },
      edgeLabel: { // 边的设置（节点之间的关系）
        show: true,
        position: "middle",
        fontSize: 12,
        formatter: (params: any) => {
          return params.data.relation.name;
        },
      },
    }
  ]
};

// 紧急程度翻译
const formatLevel = (level: number) => {
  if (level === 1) {
    return "一般";
  } else if (level === 2) {
    return "紧急";
  } else {
    return "";
  }
}

// 计算数组中某个属性值重复出现的个数
const getRepeatNum = (list: Array<any>) => {
  let obj: any = {};
  for (let i = 0, l = list.length; i < l; i++) {
    let item = list[i];
    obj[item] = (obj[item] + 1) || 1;
  }

  return obj;
}

// 更新“可选企业列表”
const getAllCorporationList = (data: any) => {
  const corporationList = Object.keys(data);

  return corporationList
}

// 翻译
const translateSelectedOption = (newOption: string) => {
  return translationTable[newOption];
}

const wealth: FC = (): ReactElement => {
  // const [alarmType, setAlarmType] = useState(2);
  const [dataSource, setDataSource] = useState([]);
  const [corporationOptions, setCorporationOptions] = useState<EChartOption>(corporationOption);
  const [levelOptions, setLevelOptions] = useState<EChartOption>(levelOption);
  const [measureOptions, setMeasureOptions] = useState<EChartOption>(measureOption);
  const [topoOptions, setTopoOptions] = useState<EChartOption>(topoOption);

  const formData = {
    categories: 2,  // 资金链
    time: 1690946777, // 以秒为单位的时间戳
    granularity: 1, // 年/月/季
    alarmType: 2, // 预警类型（全部/高于/低于）
    corporation: "小丫家电",  // 公司
    attributes: "研发费用", // 阈值波动范围
    attributesValue: "100", // 阈值
  }

  const columns = [
    {
      title: '资金类别',
      dataIndex: 'categories',
      key: 'categories',
    },
    {
      title: formData.attributes,
      dataIndex: translateSelectedOption(formData.attributes),
      key: translateSelectedOption(formData.attributes),
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
      render: (text: number) => {
        const level: string = formatLevel(text);
        return level;
      }
    },
    {
      title: '决策措施',
      dataIndex: 'measure',
      key: 'measure',
    },
  ];

  const getCurrentDataSource = (data: any) => {
    const currentDataSource = [];
    const dataWithCategories = getResDataWithCategories(data)
    const corporationList = getAllCorporationList(dataWithCategories);

    for (let i = 0; i < corporationList.length; i++) {
      if (formData.corporation === corporationList[i]) {
        currentDataSource.push(...dataWithCategories[corporationList[i]]);
      }
    }
    if (currentDataSource.length === 0) {
      for (let i = 0; i < corporationList.length; i++) {
        currentDataSource.push(...dataWithCategories[corporationList[i]]);
      }
    }

    return currentDataSource;
  }

  const getResDataWithCategories = (data: any) => {
    const dataWithCategories = deepClone(data);
    const corporationList = getAllCorporationList(dataWithCategories);

    for (let i = 0; i < corporationList.length; i++) {
      for (let j = 0; j < dataWithCategories[corporationList[i]].length; j++) {
        dataWithCategories[corporationList[i]][j].categories = formData.attributes;
      }
    }

    return dataWithCategories
  }

  const getCorporationList = (data: any) => {
    const allCorporationList = getAllCorporationList(data);
    let corporationList: string[] = [];

    for (let i = 0; i < allCorporationList.length; i++) {
      if (formData.corporation === allCorporationList[i]) {
        corporationList = [`${allCorporationList[i]}`]
      }
    }
    if (corporationList.length === 0) {
      for (let i = 0; i < allCorporationList.length; i++) {
        corporationList.push(allCorporationList[i]);
      }
    }

    return corporationList
  }

  const getCorporationData = (data: any) => {
    const corporationData = [];
    const corporationList = getCorporationList(data);

    for (let i = 0; i < corporationList.length; i++) {
      corporationData.push({
        value: 1,
        name: corporationList[i]
      })
    }

    return corporationData
  }

  const getLevelData = (data: any) => {
    const levelData = [];
    let normalNum = 0;
    let seriousNum = 0;
    const currentDataSource = getCurrentDataSource(data);

    for (let i = 0; i < currentDataSource.length; i++) {
      if (currentDataSource[i].level === 1) {
        normalNum++;
      } else if (currentDataSource[i].level === 2) {
        seriousNum++;
      }
    }
    levelData.push({
      value: normalNum,
      name: "一般"
    }, {
      value: seriousNum,
      name: "紧急"
    });

    return levelData;
  }

  const getMeasureList = (data: any) => {
    const currentDataSource = getCurrentDataSource(data);
    let measureInitList = currentDataSource.map((item: { measure: any }) => {
      return item.measure
    })
    measureInitList = getRepeatNum(measureInitList);
    const measureList = Object.keys(measureInitList);

    return measureList
  }

  const getMeasureData = (data: any) => {
    const measureData = [];
    const currentDataSource = getCurrentDataSource(data);
    let measureInitList = currentDataSource.map((item: { measure: any }) => {
      return item.measure
    })
    measureInitList = getRepeatNum(measureInitList);
    for (let i in measureInitList) {
      let obj = {
        name: i,
        value: measureInitList[i]
      }
      measureData.push(obj);
    }

    return measureData;
  }

  const getTopoGraph = (data: any) => {
    const blue = '#5470c6';
    const green = '#91cc75';
    const yellow = '#fac858';
    const red = '#ee6666';
    let nodesCount = 0; // 记录当前写入的nodes数目
    let categoriesNum = 0; // 记录所有categories数目作为links的增幅
    let categoriesCount = 0; // 记录单次遍历中已经遍历过的categories数目
    const graph: any = {
      nodes: [
        {
          id: "0",
          name: "企业",
          draggable: true,
          colors: blue,
        },
      ],
      links: [],
    };
    // 获取带categories的dataSource
    const dataWithCategories = getResDataWithCategories(data);

    // 填充nodes与links
    // push公司
    const corporationList = getAllCorporationList(dataWithCategories);
    for (let i = 0; i < corporationList.length; i++) {
      graph.nodes.push({
        id: `${i + 1}`,
        name: `${corporationList[i]}`,
        draggable: true,
        colors: blue,
      });
      graph.links.push({
        source: "0",
        target: `${i + 1}`,
        relation: { name: '' },
      });
    }
    nodesCount = graph.nodes.length;
    // push职位
    for (let i = 0; i < corporationList.length; i++) {
      for (let j = 0; j < dataWithCategories[corporationList[i]].length; j++) {
        graph.nodes.push({
          id: `${nodesCount + j}`,
          name: `${dataWithCategories[corporationList[i]][j].categories}`,
          draggable: true,
          colors: dataWithCategories[corporationList[i]][j].level === 2 ? red : dataWithCategories[corporationList[i]][j].level === 1 ? green : yellow,
          // colors: dataWithCategories[corporationList[i]][j].alarmType === 1 ? red : dataWithCategories[corporationList[i]][j].alarmType === 0 ? yellow : green,
        })
        graph.links.push({
          source: `${i + 1}`,
          target: `${nodesCount + j}`,
          relation: { name: formatLevel(dataWithCategories[corporationList[i]][j].level) },
        });
        categoriesNum++;
      }
      nodesCount = graph.nodes.length;
    }
    nodesCount = graph.nodes.length;
    // push疑似根因
    for (let i = 0; i < corporationList.length; i++) {
      for (let j = 0; j < dataWithCategories[corporationList[i]].length; j++) {
        graph.nodes.push({
          id: `${nodesCount + j}`,
          name: `${dataWithCategories[corporationList[i]][j].causeType}`,
          draggable: true,
          colors: dataWithCategories[corporationList[i]][j].level === 2 ? red : dataWithCategories[corporationList[i]][j].level === 1 ? green : yellow,
          // colors: dataWithCategories[corporationList[i]][j].alarmType === 1 ? red : dataWithCategories[corporationList[i]][j].alarmType === 0 ? yellow : green,
        })
        graph.links.push({
          source: `${corporationList.length + 1 + categoriesCount}`,
          target: `${corporationList.length + 1 + categoriesCount + categoriesNum}`,
          relation: { name: '疑似根因' },
        });
        categoriesCount++;
      }
      nodesCount = graph.nodes.length;
    }
    nodesCount = graph.nodes.length;
    // push决策措施
    categoriesCount = 0;
    for (let i = 0; i < corporationList.length; i++) {
      for (let j = 0; j < dataWithCategories[corporationList[i]].length; j++) {
        graph.nodes.push({
          id: `${nodesCount + j}`,
          name: `${dataWithCategories[corporationList[i]][j].measure}`,
          draggable: true,
          colors: dataWithCategories[corporationList[i]][j].level === 2 ? red : dataWithCategories[corporationList[i]][j].level === 1 ? green : yellow,
          // colors: dataWithCategories[corporationList[i]][j].alarmType === 1 ? red : dataWithCategories[corporationList[i]][j].alarmType === 0 ? yellow : green,
        })
        graph.links.push({
          source: `${corporationList.length + 1 + categoriesCount + categoriesNum}`,
          target: `${corporationList.length + 1 + categoriesCount + 2 * categoriesNum}`,
          relation: { name: '决策措施' },
        });
        categoriesCount++;
      }
      nodesCount = graph.nodes.length;
    }
    nodesCount = graph.nodes.length;
    categoriesCount = 0;

    // byd终于整出来了，累死了
    return graph;
  };

  const onFinish = () => {
    // setAlarmType(values.alarmType);
    const params = {
      time: formData.time,
      granularity: formData.granularity,
      categories: formData.categories,
      attributes: formData.attributes,
    }

    getWealthDecision(params).then((res: any) => {
      // table根据当前表单公司来展示对应公司数据
      const currentDataSource: any = getCurrentDataSource(res.data)
      setDataSource(currentDataSource);
      // 填充圆环图数据
      const corporationList = getAllCorporationList(res.data);
      const corporationData = getCorporationData(res.data);
      const levelData = getLevelData(res.data);
      const measureList = getMeasureList(res.data);
      const measureData = getMeasureData(res.data);
      const graph = getTopoGraph(res.data);
      setCorporationOptions({
        title: {
          text: '决策对象',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 14,
            fontWeight: "normal"
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: corporationList
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: corporationData
          }
        ]
      });
      setLevelOptions({
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '紧急程度',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 14,
            fontWeight: "normal"
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['一般', '紧急']
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: levelData
          }
        ]
      });
      setMeasureOptions({
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '决策措施',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 14,
            fontWeight: "normal"
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: measureList
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: measureData
          }
        ]
      });
      setTopoOptions({
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Topo',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            label: {
              show: true,
              position: "inside",
              distance: 5,
              fontSize: 12,
              align: "center",
            },
            symbolSize: 90,
            roam: true,
            edgeSymbol: ["circle", "arrow"],
            force: { // 节点排斥力设置
              repulsion: 200,
              gravity: 0,
              edgeLength: 200
            },
            itemStyle: {
              normal: { // 不同节点显示不同颜色
                color: function (params: any) {
                  return params.data.colors || '#5470c6'; //获取具体的参数
                },
              }
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3 // 线的曲率
            },
            edgeLabel: { // 边的设置（节点之间的关系）
              show: true,
              position: "middle",
              fontSize: 12,
              formatter: (params: any) => {
                return params.data.relation.name;
              },
            },
          }
        ]
      });
    })
  }

  return (
    <Fragment>
      <div
        css={{
          position: 'relative',
          height: '36px',
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
          资金决策分析
        </div>
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            lineHeight: '36px',
            right: '0',
          }}
        >
          {/* <span>请选择预警类型：</span> */}
          <Form
            layout="inline"
            // initialValues={{ granularity: 1, time: 1690946777 }}
            onFinish={onFinish}
            css={{
              display: 'inline-flex'
            }}
          >
            {/* <Form.Item
              name="alarmType"
            >
              <Select
                css={{
                  width: '100px !important',
                }}
              >
                <Select.Option value={2}>全部</Select.Option>
                <Select.Option value={1}>高于预警</Select.Option>
                <Select.Option value={0}>低于预警</Select.Option>
              </Select>
            </Form.Item> */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                生成决策
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        css={{
          marginTop: "10px",
        }}
      >
        1. 企业资金决策措施及响应程度
      </div>
      <div
        css={{
          marginTop: "10px",
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
        />
      </div>
      <div
        css={{
          marginTop: "10px",
        }}
      >
        2. 企业资金高于预警决策分析
      </div>
      <div
        css={{
          marginTop: '5px',
          display: 'flex',
        }}
      >
        <Charts
          options={corporationOptions}
          style={{
            height: "300px",
            width: "50%",
          }}
        />
        <Charts
          options={levelOptions}
          style={{
            height: "300px",
            width: "50%",
          }}
        />
      </div>
      <div>
        <Charts
          options={measureOptions}
          style={{
            height: "300px",
            width: "100%",
          }}
        />
      </div>
      <div
        css={{
          marginTop: "30px",
        }}
      >
        3. 企业资金拓扑
      </div>
      <div>
        <Charts
          options={topoOptions}
          style={{
            height: "800px",
            width: "100%",
          }}
        />
      </div>
    </Fragment>
  )
}

export default wealth;