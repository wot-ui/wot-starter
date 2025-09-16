<script setup lang="ts">
import { BarChart } from 'echarts/charts'
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
  BarChart,
  CanvasRenderer,
])

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    textStyle: {
      // #ifdef MP-WEIXIN
      // 临时解决微信小程序 tooltip 文字阴影问题
      textShadowBlur: 1,
      // #endif
    },
  },
  legend: {
    data: ['产品A', '产品B', '产品C'],
    top: 35,
    left: 'center',
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 12,
    },
  },
  grid: {
    left: '8%',
    right: '8%',
    top: '25%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['Q1', 'Q2', 'Q3', 'Q4'],
    axisLabel: {
      fontSize: 12,
      color: '#666',
    },
    axisLine: {
      lineStyle: {
        color: '#e0e0e0',
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 12,
      color: '#666',
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0',
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: '产品A',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#5470c6',
        borderRadius: [0, 0, 0, 0],
      },
      data: [120, 132, 101, 134],
    },
    {
      name: '产品B',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#91cc75',
        borderRadius: [0, 0, 0, 0],
      },
      data: [220, 182, 191, 234],
    },
    {
      name: '产品C',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: '#fac858',
        borderRadius: [4, 4, 0, 0],
      },
      data: [150, 212, 201, 154],
    },
  ],
})
</script>

<template>
  <uni-echarts custom-class="h-300px" :option="option" />
</template>
