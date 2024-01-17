<script setup>
import { useConceptsExplainStore } from '@/stores/ConceptsExplainSt'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import BasicConceptsCard from '../components/BasicConceptsCard.vue'
import BasicConceptsCards from '../components/BasicConceptsCards.vue'
const conceptsExplainStore = useConceptsExplainStore()
const router = useRouter()
</script>

<template>
  <div class="w-full text-[#466CA6] bg-[#171635] flex">
    <div class="w-[60%] min-h-[100vh] flex flex-col justify-evenly items-center">
      <p class="w-[50%] mt-8">
        <el-button
          type="primary"
          class="border-2 w-[100%] font-bold"
          @click="
            () => {
              router.push('/')
            }
          "
          size="large"
          ><el-icon class="el-icon--right mr-2"><ArrowLeftBold /></el-icon>首页</el-button
        >
      </p>
      <BasicConceptsCard
        :duration="0.5"
        title="定义"
        content="简单来说，动态规划其实就是，给定一个问题，
      我们把它拆成一个个子问题，直到子问题可以直接解决。然后呢，把子问题答案保存起来，以减少重复计算。再根据子问题答案反推，得出原问题解的一种方法。
      "
      />
      <BasicConceptsCard
        :duration="1"
        title="题型"
        content="求最优解（最大、最长、最合理......），求可行性，求总数
      "
      />
      <BasicConceptsCard
        :duration="1.5"
        title="核心算法"
        content="穷举 --- “如何穷举”、“如何聪明地穷举”
      "
      />
      <BasicConceptsCards
        :duration="2"
        title="核心问题"
        :contents="['状态转移方程（重要）', '重叠子问题', '最优子结构']"
      />
      <BasicConceptsCards
        :duration="2.5"
        title="思维框架"
        :contents="['明确 base case', '明确「状态」', '明确「选择」', '定义 dp 数组/函数的含义']"
      />
    </div>
    <div class="w-[40%] flex justify-evenly border-l-2">
      <div
        class="intro w-full h-[100vh] sticky top-0 p-8"
        v-html="conceptsExplainStore.getConceptsExplain()"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
