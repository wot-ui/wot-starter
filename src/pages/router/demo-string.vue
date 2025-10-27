<script setup lang="ts">
definePage({
  name: 'demo-string',
  style: {
    navigationBarTitleText: '字符串路径跳转',
  },
})

const router = useRouter()
const route = useRoute()

function goBack() {
  router.back()
}

function pushToObject() {
  router.push({ path: '/pages/router/demo-object' })
}
</script>

<template>
  <view class="min-h-screen flex-col gap-3 py-3">
    <!-- 头部 -->
    <wd-card class="text-center !mb-0" custom-content-class="py-4 flex-col gap-y-3">
      <view class="mb-3 text-8">
        📝
      </view>
      <view class="text-5 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        字符串路径跳转演示
      </view>
      <view class="text-3.5">
        使用 router.push('/path') 进行跳转
      </view>
    </wd-card>

    <!-- 跳转信息 -->
    <demo-block title="跳转信息" custom-card-content-class="py-4 flex-col gap-y-3">
      <view class="mx-4 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
        当前页面信息
      </view>
      <wd-cell-group class="cell-justify-end">
        <wd-cell size="small" title="路径:" :value="route.path" />
        <wd-cell size="small" title="跳转方式:" value="字符串路径" />
        <wd-cell size="small" title="代码:" value="router.push('/pages/router/demo-string')" />
      </wd-cell-group>
    </demo-block>

    <!-- 操作按钮 -->
    <demo-block title="继续演示">
      <template #description>
        <view class="flex-col gap-y-3">
          <wd-button type="primary" block @click="pushToObject">
            跳转到对象路径演示
          </wd-button>
          <wd-button type="warning" block @click="goBack">
            返回上一页
          </wd-button>
        </view>
      </template>
    </demo-block>
  </view>
</template>
