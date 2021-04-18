import React, { memo, useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react';
import moment from 'moment'

import { getVisitsStatistics } from '@/services/workbanch';

import { ChartWrapper } from './style'

export default memo(function Chart() {

  const [xAxisArr, setXAxisArr] = useState()
  const [seriesArr, setSeriesArr] = useState()

  useEffect(() => {
    getVisitsStatistics().then(res => {
      setXAxisArr(res.data.map(x => moment(x.days).format("YYYY-MM-DD")))
      setSeriesArr(res.data.map(x => x.count))
    })
  }, [])

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: xAxisArr,
      axisLabel: {
        show: true,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      // max: function(value) {
      //   return value.max + 10
      // }
    },
    series: [
      {
        data: seriesArr,
        type: 'bar',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <ChartWrapper>
      <h2>瀏覽量統計</h2>
      <ReactECharts option={options} />
    </ChartWrapper>
  );
})
