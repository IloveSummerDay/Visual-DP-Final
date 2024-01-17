<script setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="w-full text-[#466CA6] bg-[#171635] flex-col p-4 relative">
    <div class="w-full font-bold text-[#466CA6] text-[3rem] mb-8">Summary :</div>
    <div class="w-[70%] mx-auto">
      <div class="font-bold text-[#466CA6] text-[1.5rem] mb-8">
        1. 重叠子问题、最优子结构、状态转移方程就是动态规划三要素。
      </div>
      <div class="font-bold text-[#466CA6] text-[1.5rem] mb-8">
        2. 动态规划的尽头是穷举，最基础（笨）的方法是暴力递归，再优化一下就是记忆化搜索（带备忘录），再往后 dp
        数组的迭代（递推）解法（未在可视化中展示），最后就是动态规划了。
      </div>
      <div class="font-bold text-[#466CA6] text-[1.5rem] mb-8">
        3. 千万不要看不起暴力解，动态规划问题最困难的就是写出这个暴力解，即状态转移方程。
      </div>
      <div class="font-bold text-[#466CA6] text-[1.5rem] mb-8">
        4.
        计算机解决问题其实没有任何特殊的技巧，它唯一的解决办法就是穷举，穷举所有可能性。算法设计无非就是先思考“如何穷举”，然后再追求“如何聪明地穷举”。
        （ 列出状态转移方程，就是在解决“如何穷举”的问题 ）（ 备忘录、DP table 就是在追求“如何聪明地穷举” ）
      </div>
      <div class="font-bold text-[#466CA6] text-[1rem] mb-8">
        参考链接：<a
          class="hover:underline"
          href="https://labuladong.gitee.io/algo/di-er-zhan-a01c6/dong-tai-g-a223e/dong-tai-g-1e688/"
          target="_blank"
          >labuladong的算法笔记</a
        >
      </div>
    </div>
    <el-button
      type="primary"
      class="fixed bottom-[3rem] right-[3rem] border-2"
      size="large"
      @click="
        () => {
          router.push('/')
        }
      "
      >首 页<el-icon class="ml-2"><ArrowRightBold /></el-icon
    ></el-button>
  </div>
</template>

<style scoped></style>
