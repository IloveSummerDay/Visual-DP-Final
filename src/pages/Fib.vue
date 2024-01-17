<script setup>
import { ArrowLeftBold, Document } from '@element-plus/icons-vue'
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const fibSubject = ref(null)
const reverse = ref(null)
const router = useRouter()
onMounted(() => {
  // console.log(parseInt(window.getComputedStyle(fibSubject.value).getPropertyValue('height')))
  reverse.value = gsap.to(fibSubject.value, {
    delay: 1.5,
    y: -1 * parseInt(window.getComputedStyle(fibSubject.value).getPropertyValue('height')),
    duration: 0.5
  })
})
const handleCloseSubject = () => {
  reverse.value.reversed(!reverse.value.reversed())
}
</script>

<template>
  <div class="bg-[#171635] min-h-[100vh] flex justify-evenly items-center relative">
    <div
      class="fib-subject p-4 w-[70%] mx-auto leading-8 bg-white rounded-b-lg fixed top-0 z-50 shadow-lg"
      ref="fibSubject"
    >
      <span class="font-bold">斐波那契数</span> （通常用
      <span class="bg-[#eeeeee] opacity-50 p-1">F(n)</span> 表示）形成的序列称为
      <span class="font-bold">斐波那契数列</span> 。该数列由 0 和 1
      开始，后面的每一项数字都是前面两项数字的和。也就是：<br />
      <div class="bg-[#eeeeee] opacity-50 p-2 inline-block font-bold">
        <p>F(0) = 0，F(1) = 1</p>
        <p>F(n) = F(n - 1) + F(n - 2)</p>
      </div>
      <br />其中<span class="bg-[#eeeeee] opacity-50 p-1"> n > 1</span> 给定
      <span class="bg-[#eeeeee] opacity-50 p-[2px]">n</span> ，请计算
      <span class="bg-[#eeeeee] opacity-50 p-1">F(n) </span>。
    </div>

    <el-button-group class="fixed top-[1rem] left-[1rem] justify-evenly">
      <el-button
        type="primary"
        class="border-2"
        :icon="ArrowLeftBold"
        @click="
          () => {
            router.push('/')
          }
        "
        size="large"
      />
      <el-button
        type="primary"
        class="border-2"
        @click="handleCloseSubject"
        :icon="Document"
        size="large"
      />
    </el-button-group>
    <div class="h-[90vh] w-[90%] mx-auto overflow-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
