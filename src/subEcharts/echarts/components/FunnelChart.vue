<script setup lang="ts">
import { FunnelChart } from 'echarts/charts'
import { LegendComponent, TooltipComponent } from 'echarts/components'
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
  FunnelChart,
  CanvasRenderer,
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
      name: '销售漏斗',
      type: 'funnel',
      left: '10%',
      top: 60,
      width: '80%',
      height: '60%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside',
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid',
        },
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 14,
        },
      },
      data: [
        {
          value: 100,
          name: '访问量',
          itemStyle: {
            color: '#5470c6',
          },
        },
        {
          value: 80,
          name: '浏览商品',
          itemStyle: {
            color: '#91cc75',
          },
        },
        {
          value: 60,
          name: '加入购物车',
          itemStyle: {
            color: '#fac858',
          },
        },
        {
          value: 40,
          name: '提交订单',
          itemStyle: {
            color: '#ee6666',
          },
        },
        {
          value: 20,
          name: '支付成功',
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
