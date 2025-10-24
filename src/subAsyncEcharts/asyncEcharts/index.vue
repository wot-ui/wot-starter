<script setup lang="ts">
import BarChart from '@/subEcharts/echarts/components/BarChart.vue?async'
import DonutChart from '@/subEcharts/echarts/components/DonutChart.vue?async'
import FunnelChart from '@/subEcharts/echarts/components/FunnelChart.vue?async'
import GaugeChart from '@/subEcharts/echarts/components/GaugeChart.vue?async'
import LineChart from '@/subEcharts/echarts/components/LineChart.vue?async'
import LiquidFillChart from '@/subEcharts/echarts/components/LiquidFillChart.vue?async'
import MiniLineChart from '@/subEcharts/echarts/components/MiniLineChart.vue?async'
import PieChart from '@/subEcharts/echarts/components/PieChart.vue?async'
import ScatterChart from '@/subEcharts/echarts/components/ScatterChart.vue?async'
import StackedBarChart from '@/subEcharts/echarts/components/StackedBarChart.vue?async'
import RadarChart from '@/subEcharts/echarts/components/RadarChart.vue?async'

definePage({
  name: 'echartsAsync',
  style: {
    navigationBarTitleText: 'echarts 异步跨包示例',
  },
})
</script>

<template>
  <view class="flex flex-col gap-2 py-5">
    <!-- 饼图 -->
    <wd-card class="shadow-sm" title="饼图示例">
      <PieChart />
    </wd-card>

    <!-- 柱状图 -->
    <wd-card class="shadow-sm" title="柱状图示例">
      <BarChart />
    </wd-card>

    <!-- 折线图 -->
    <wd-card class="shadow-sm" title="折线图示例">
      <LineChart />
    </wd-card>

    <!-- 雷达图 -->
    <wd-card class="shadow-sm" title="雷达图示例">
      <RadarChart />
    </wd-card>

    <!-- 散点图 -->
    <wd-card class="shadow-sm" title="散点图示例">
      <ScatterChart />
    </wd-card>

    <!-- 环形图 -->
    <wd-card class="shadow-sm" title="环形图示例">
      <DonutChart />
    </wd-card>

    <!-- 漏斗图 -->
    <wd-card class="shadow-sm" title="漏斗图示例">
      <FunnelChart />
    </wd-card>

    <!-- 仪表盘图 -->
    <wd-card class="shadow-sm" title="仪表盘示例">
      <GaugeChart />
    </wd-card>

    <!-- 迷你折线图 -->
    <wd-card class="shadow-sm" title="迷你折线图示例">
      <MiniLineChart />
    </wd-card>

    <!-- 堆叠柱状图 -->
    <wd-card class="shadow-sm" title="堆叠柱状图示例">
      <StackedBarChart />
    </wd-card>

    <!-- 水球图 -->
    <wd-card class="shadow-sm" title="水球图示例">
      <LiquidFillChart />
    </wd-card>
  </view>
</template>
