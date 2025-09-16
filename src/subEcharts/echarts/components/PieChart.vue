<script setup lang="ts">
import { PieChart } from 'echarts/charts'
import { DatasetComponent, LegendComponent, TooltipComponent } from 'echarts/components'
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
])

const option = ref({
  legend: {
    top: 10,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    textStyle: {
      // #ifdef MP-WEIXIN
      // 临时解决微信小程序 tooltip 文字阴影问题
      textShadowBlur: 1,
      // #endif
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['30%', '52%'],
      label: {
        show: false,
        position: 'center',
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 10,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
        },
      },
    },
  ],
  dataset: {
    dimensions: ['来源', '数量'],
    source: [
      ['Search Engine', 1048],
      ['Direct', 735],
      ['Email', 580],
      ['Union Ads', 484],
      ['Video Ads', 300],
    ],
  },
})
</script>

<template>
  <uni-echarts custom-class="h-300px" :option="option" />
</template>
