<script setup lang="ts">
import { LineChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { provideEcharts } from 'uni-echarts/shared'

// 由于尚未明确的原因，目前 npm 插件的编译机制存在问题
// 小程序端的 npm 插件内部无法正确获取到业务侧的 echarts
// 所以需要手动将 echarts 提供给插件用于构建图表
provideEcharts(echarts) // 🚨 注意：npm 方式需要添加这一行代码
echarts.use([
  GridComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  LineChart,
  CanvasRenderer,
])

const option = ref({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['访问量', '用户数'],
    top: 30,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '访问量',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      itemStyle: {
        color: '#5470c6',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(84, 112, 198, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(84, 112, 198, 0.1)',
            },
          ],
        },
      },
    },
    {
      name: '用户数',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true,
      itemStyle: {
        color: '#91cc75',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(145, 204, 117, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(145, 204, 117, 0.1)',
            },
          ],
        },
      },
    },
  ],
})
</script>

<template>
  <uni-echarts custom-class="h-300px" :option="option" />
</template>
