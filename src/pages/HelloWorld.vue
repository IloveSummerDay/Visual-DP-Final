<script setup>
import { ref } from 'vue'
// ref
const navs = ref(['/base', '/fib/recursion', '/fib/iteration', '/summary'])
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-[#171635] flex flex-col justify-evenly">
    <div class="font-bold text-[#466CA6] text-[6rem] text-center">可视化 · 动态规划</div>
    <div class="flex justify-evenly items-center">
      <div
        v-for="(option, i) in ['基础概念', '斐波那契数列 (自顶向下)', '斐波那契数列 (自底向上)', '总结']"
        class="text-[#D6CFC4] text-[2rem]"
        :key="i"
      >
        <router-link :to="`${navs[i]}`">
          <el-button
            :color="'#D1AE45'"
            class="text-[#D1AE45] flex-1 p-8 text-[1.3rem] font-bold hover:text-purple"
            >{{ option }}</el-button
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
