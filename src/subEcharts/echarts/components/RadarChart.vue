<script setup lang="ts">
import { RadarChart } from 'echarts/charts'
import { LegendComponent, RadarComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { provideEcharts } from 'uni-echarts/shared'

// 由于尚未明确的原因，目前 npm 插件的编译机制存在问题
// 小程序端的 npm 插件内部无法正确获取到业务侧的 echarts
// 所以需要手动将 echarts 提供给插件用于构建图表
provideEcharts(echarts) // 🚨 注意：npm 方式需要添加这一行代码
echarts.use([
  RadarComponent,
  LegendComponent,
  TooltipComponent,
  RadarChart,
  CanvasRenderer,
])

const option = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['张三', '李四'],
    top: 30,
  },
  radar: {
    indicator: [
      { name: '技术能力', max: 100 },
      { name: '沟通能力', max: 100 },
      { name: '学习能力', max: 100 },
      { name: '团队协作', max: 100 },
      { name: '创新能力', max: 100 },
      { name: '执行力', max: 100 },
    ],
    shape: 'polygon',
    splitNumber: 5,
    axisName: {
      color: '#666',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(211, 253, 250, 0.8)',
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(211, 253, 250, 0.8)',
      },
    },
  },
  series: [
    {
      name: '能力评估',
      type: 'radar',
      data: [
        {
          value: [85, 75, 90, 80, 70, 85],
          name: '张三',
          itemStyle: {
            color: '#5470c6',
          },
          areaStyle: {
            color: 'rgba(84, 112, 198, 0.3)',
          },
        },
        {
          value: [70, 90, 80, 85, 85, 75],
          name: '李四',
          itemStyle: {
            color: '#91cc75',
          },
          areaStyle: {
            color: 'rgba(145, 204, 117, 0.3)',
          },
        },
      ],
    },
  ],
})
</script>

<template>
  <uni-echarts custom-class="h-300px" :option="option" />
</template>
