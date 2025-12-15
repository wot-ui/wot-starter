<script setup lang="ts">
import BarChart from '@/subEcharts/echarts/components/BarChart.vue?async'
import DonutChart from '@/subEcharts/echarts/components/DonutChart.vue?async'
import FunnelChart from '@/subEcharts/echarts/components/FunnelChart.vue?async'
import GaugeChart from '@/subEcharts/echarts/components/GaugeChart.vue?async'
import LineChart from '@/subEcharts/echarts/components/LineChart.vue?async'
import LiquidFillChart from '@/subEcharts/echarts/components/LiquidFillChart.vue?async'
import MiniLineChart from '@/subEcharts/echarts/components/MiniLineChart.vue?async'
import PieChart from '@/subEcharts/echarts/components/PieChart.vue?async'
import RadarChart from '@/subEcharts/echarts/components/RadarChart.vue?async'
import ScatterChart from '@/subEcharts/echarts/components/ScatterChart.vue?async'
import StackedBarChart from '@/subEcharts/echarts/components/StackedBarChart.vue?async'

definePage({
  name: 'echartsAsync',
  style: {
    navigationBarTitleText: 'echarts 异步跨包示例',
  },
})
</script>

<template>
  <view class="bg-gray-50 p-5">
    <!-- 饼图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        饼图示例
      </view>
      <PieChart />
    </view>

    <!-- 柱状图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        柱状图示例
      </view>
      <BarChart />
    </view>

    <!-- 折线图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        折线图示例
      </view>
      <LineChart />
    </view>

    <!-- 雷达图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        雷达图示例
      </view>
      <RadarChart />
    </view>

    <!-- 散点图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        散点图示例
      </view>
      <ScatterChart />
    </view>

    <!-- 环形图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        环形图示例
      </view>
      <DonutChart />
    </view>

    <!-- 漏斗图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        漏斗图示例
      </view>
      <FunnelChart />
    </view>

    <!-- 仪表盘图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        仪表盘示例
      </view>
      <GaugeChart />
    </view>

    <!-- 迷你折线图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        迷你折线图示例
      </view>
      <MiniLineChart />
    </view>

    <!-- 堆叠柱状图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        堆叠柱状图示例
      </view>
      <StackedBarChart />
    </view>

    <!-- 水球图 -->
    <view class="mb-5 rounded-3 bg-white p-5 shadow-sm">
      <view class="mb-5 text-center text-base text-gray-800 font-medium">
        水球图示例
      </view>
      <LiquidFillChart />
    </view>
  </view>
</template>
