import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConceptsExplainStore = defineStore('ConceptsExplainStore', () => {
  const nowConcept = ref('定义')
  const getConceptsExplain = () => {
    return conceptsHTML[nowConcept.value]
  }
  function handleChangeConceptsExplain(newVal) {
    nowConcept.value = newVal
  }

  return { nowConcept, getConceptsExplain, handleChangeConceptsExplain }
})

const conceptsHTML = {
  定义: `
  <p class="text-center text-[1.2rem] text-yellow font-bold">动态规划（Dynamic programming，简称DP）</p>
<div class="mt-4">
  <p class="indent-8">
    动态规划是一种将复杂问题分解成很多子问题，并将子问题的求解结果存储起来避免重复求解的一种算法。
  </p>
  <p class="indent-8">
    动态规划一般用来解决<span class="font-bold text-yellow underline">最优问题</span
    >。而解决问题的过程，需要经历多个决策阶段。每个决策阶段都对应着一组状态。最后通过一组决策序列（动态转移方程），产生最终期望的最优解。
  </p>
  <p class="indent-8">
    接下来将使用<span class="font-bold text-yellow underline">动态规划对斐波那契数列递归算法进行优化</span>
  </p>`,
  题型: `
  <p class="text-center text-[1.2rem] text-yellow font-bold">动态规划 LeetCode</p>
        <p class="text-center italic text-white opacity-50 text-[0.8rem]">(简 -> 难)</p>
        <div class="mt-4">
          <p class="indent-8 font-bold">
            <a
              href="https://leetcode.com/problems/fibonacci-number/"
              target="_blank"
              class="text-yellow underline"
              >509.</a
            >
            Fibonacci Number
          </p>
          <p class="indent-8 font-bold">
            <a
              href="https://leetcode.com/problems/coin-change/"
              target="_blank"
              class="text-yellow underline"
              >322.</a
            >
            Coin Change
          </p>
          <p class="indent-8 font-bold">
            <a
              href="https://leetcode.com/problems/edit-distance/"
              target="_blank"
              class="text-yellow underline"
              >72.</a
            >Edit Distance
          </p>
        </div>`,
  核心算法: `
  <div class="w-full h-[70vh] flex flex-col justify-center">
          <p class="text-center text-[1rem] flex justify-center items-center text-yellow font-bold">
            计算机解决问题其实没有任何特殊的技巧，它唯一的解决办法就是穷举
          </p>
          <p class="text-right text-[1rem] mt-8 text-yellow opacity-40 font-bold">——— 某位智者</p>
        </div>`,
  核心问题: `
  <p class="text-center text-[1.2rem] text-yellow font-bold">核心问题 · 个人理解</p>
  <div class="mt-4">
    <p class="indent-8 font-bold">
      1、状态转移方程:
      <span class="text-yellow opacity-90 font-normal"
        >动态规划中本阶段的状态往往是上一阶段状态或上一阶段决策的结果;
        原问题拆分成一个个子问题时的转换关系，例如Fib: F(n) = F(n-1) + F(n-2)
      </span>
    </p>
    <p class="indent-8 font-bold">
      2、重叠子问题:
      <span class="text-yellow opacity-90 font-normal"
        >由于是递归穷举，某一种子问题会被重复求解, 例如 Fib: F(n) = F(n-1) + F(n-2)
        中子问题会被重复求解（若不记录子问题结果）
      </span>
    </p>
    <p class="indent-8 font-bold">
      3、最优子结构: 
      <span class="text-yellow opacity-90 font-normal"
        >给定的问题，把它拆成一个个子问题时，子问题间必须互相独立, 互不干扰
      </span>
    </p>
  </div>`,
  思维框架: `
  <p class="text-center text-[1.2rem] text-yellow font-bold">关键词解释</p>
  <div class="mt-4">
    <p class="indent-8 font-bold">
      1、状态:
      <span class="text-yellow opacity-90 font-normal">原问题和子问题中会变化的变量</span>
    </p>
    <p class="indent-8 font-bold">
      2、选择:
      <span class="text-yellow opacity-90 font-normal">导致「状态」产生变化的行为 </span>
    </p>
    <p class="indent-8 font-bold">
      3、dp 函数/数组的定义:
      <span class="text-yellow opacity-90 font-normal">
        <span class="font-bold">自顶向下递归</span>求解时需要 dp递归函数 ||
        <span class="font-bold">自底向上迭代</span>求解时需要dp数组
      </span>
    </p>
  </div>`
}
