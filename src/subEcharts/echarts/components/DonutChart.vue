<script setup lang="ts">
import { PieChart } from 'echarts/charts'
import { DatasetComponent, GraphicComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { provideEcharts } from 'uni-echarts/shared'

// 由于尚未明确的原因，目前 npm 插件的编译机制存在问题
// 小程序端的 npm 插件内部无法正确获取到业务侧的 echarts
// 所以需要手动将 echarts 提供给插件用于构建图表
provideEcharts(echarts) // 🚨 注意：npm 方式需要添加这一行代码

echarts.use([
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  PieChart,
  CanvasRenderer,
  GraphicComponent,
])

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
    textStyle: {
      // #ifdef MP-WEIXIN
      // 临时解决微信小程序 tooltip 文字阴影问题
      textShadowBlur: 1,
      // #endif
    },
  },
  legend: {
    orient: 'horizontal',
    bottom: 10,
    left: 'center',
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 12,
    },
  },
  series: [
    {
      name: '用户占比',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: '#ffffff',
      },
      data: [
        {
          value: 335,
          name: 'iOS',
          itemStyle: {
            color: '#5470c6',
          },
        },
        {
          value: 310,
          name: 'Android',
          itemStyle: {
            color: '#91cc75',
          },
        },
        {
          value: 234,
          name: 'H5',
          itemStyle: {
            color: '#fac858',
          },
        },
        {
          value: 135,
          name: '小程序',
          itemStyle: {
            color: '#ee6666',
          },
        },
        {
          value: 86,
          name: '其他',
          itemStyle: {
            color: '#73c0de',
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
