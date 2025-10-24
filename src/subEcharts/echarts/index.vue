<script setup lang="ts">
import BarChart from './components/BarChart.vue'
import DonutChart from './components/DonutChart.vue'
import FunnelChart from './components/FunnelChart.vue'
import GaugeChart from './components/GaugeChart.vue'
import LineChart from './components/LineChart.vue'
import LiquidFillChart from './components/LiquidFillChart.vue'
import MiniLineChart from './components/MiniLineChart.vue'
import PieChart from './components/PieChart.vue'
import RadarChart from './components/RadarChart.vue'
import ScatterChart from './components/ScatterChart.vue'
import StackedBarChart from './components/StackedBarChart.vue'

definePage({
  name: 'echarts',
  style: {
    navigationBarTitleText: 'Echarts 演示',
  },
})

const router = useRouter()

function navigateToAsync() {
  router.push({
    name: 'echartsAsync',
  })
}
</script>

<template>
  <view class="flex flex-col gap-2 py-5">
    <!-- 异步 Echarts 入口 -->
    <wd-card class="shadow-sm" custom-class="!p-0">
      <wd-button block :round="false" @click="navigateToAsync">
        查看异步 Echarts 示例
      </wd-button>
    </wd-card>

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
