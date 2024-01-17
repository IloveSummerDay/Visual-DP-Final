<script setup>
import { CaretRight, Notebook } from '@element-plus/icons-vue'
import prismjs from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-tomorrow.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { aniStep_1, aniStep_2, aniSteps_beford_sum, aniSteps_sum } from '../gsap/fib-recursion-steps'
const desc = ref('')
const aniPlaying = ref(false)
const disabled = ref(false)
const n = ref(5)
const router = useRouter()
const dp = ref([])
const aniSteps = ref([])
const aniStepsIndex = ref(0) // max-length: 2n
const nowFibNumber = ref(2) // max-length: 2n

onMounted(() => {
  prismjs.highlightAll()
  handleInitAniSteps()
  console.log(aniSteps.value)
})
function handleInitAniSteps() {
  aniSteps.value.push(
    ...[
      (dplist, n, nowFibNumber) => {
        dp.value = aniStep_1(dplist, n)
        desc.value = `初始化 <span class='ml-2 font-bold bg-yellow rounded-md p-1'>dp[n + 1]</span>`
      },
      (dplist, n, nowFibNumber) => {
        dp.value = aniStep_2(dplist)
        desc.value = `赋值 <span class='ml-2 font-bold bg-yellow rounded-md p-1'>dp[0], dp[1]</span>`
      }
    ]
  )
  for (let k = 0, j = 0; j < n.value - 1; k += 2, j++) {
    aniSteps.value[k + 2] = (dplist, n, nowFibNumber) => {
      dp.value = aniSteps_beford_sum(dplist, n, nowFibNumber)
      desc.value = `<span class='ml-2 font-bold bg-yellow rounded-md p-1 w-[50%] text-center'>
        dp[${nowFibNumber - 2}] + dp[${nowFibNumber - 1}] -> dp[${nowFibNumber}]</span>`
    }
    aniSteps.value[k + 3] = (dplist, n, nowFibNumber) => {
      dp.value = aniSteps_sum(dplist, n, nowFibNumber)
      desc.value = `<span class='ml-2 font-bold bg-yellow rounded-md p-1 w-[50%] text-center'>dp[${nowFibNumber}]</span>`
    }
  }
}
const handleVisualizeFib = () => {
  if (aniPlaying.value) return
  //   恢复初始值
  aniStepsIndex.value = 0
  nowFibNumber.value = 2
  dp.value = []
  desc.value = ''
  //
  disabled.value = true
  aniPlaying.value = true
  let pause = true
  let interval = setInterval(() => {
    if (aniStepsIndex.value <= n.value * 2 - 1) {
      console.log('aniStepsIndex', aniStepsIndex.value, nowFibNumber.value)
      //   aniSteps.value[aniStepsIndex.value](dp.value, n.value, nowFibNumber.value)
      if (aniStepsIndex.value == 0 || aniStepsIndex.value == 1) {
        aniSteps.value[aniStepsIndex.value](dp.value, n.value, aniStepsIndex.value)
      } else if (pause && aniStepsIndex.value % 2 == 0) {
        pause = false
        console.log('nowFibNumber.value++')
        aniSteps.value[aniStepsIndex.value](dp.value, n.value, nowFibNumber.value)
        // if (aniStepsIndex.value == 2) return
      } else {
        pause = true
        aniSteps.value[aniStepsIndex.value](dp.value, n.value, nowFibNumber.value)
        nowFibNumber.value++
      }
      aniStepsIndex.value++
    } else {
      clearInterval(interval)
      disabled.value = false
      aniPlaying.value = false
    }
  }, 1500)
}
// 改变 fib(n) 的n
const handleNChange = value => {
  n.value = value
  handleInitAniSteps()
}
</script>

<template>
  <div class="flex h-full justify-center">
    <div class="flex flex-col justify-evenly items-center">
      <pre class="language-javaScript rounded-lg">
        <code class=" line-numbers">// dp 数组的迭代（递推）解法: 
        // 把之前的「备忘录」独立出来成为一张表(DP table)
        // 在这张表上完成「自底向上」的推算
        var fib = function(N) {
            if (N === 0) return 0;
            let dp = new Array(N + 1).fill(0);
            // base case
            dp[0] = 0; dp[1] = 1;
            // 状态转移
            for (let i = 2; i &lt;= N; i++) {
                dp[i] = dp[i - 1] + dp[i - 2];
            }

            return dp[N];
        };</code>
      </pre>
      <el-button
        type="primary"
        class="border-2"
        size="large"
        @click="
          () => {
            router.push('/fib/final')
          }
        "
        >查看 最终优化后的解法<el-icon class="ml-2"><Notebook /></el-icon
      ></el-button>
    </div>
    <div class="flex flex-1 flex-col justify-evenly relative">
      <div class="h-[10%] flex justify-evenly items-center absolute top-[10%] w-full">
        <el-input-number
          v-model="n"
          :min="2"
          :max="10"
          :disabled="disabled"
          @change="handleNChange"
        />
        <el-button
          type="primary"
          class="border-2"
          @click="handleVisualizeFib"
        >
          <el-icon size="1rem"><CaretRight /></el-icon>Visualize</el-button
        >
      </div>
      <div class="visual-box w-full h-[50%] flex-col flex justify-evenly items-center">
        <div class="w-full flex justify-evenly items-center">
          <span class="p-4 text-yellow font-bold"> DP Index</span>
          <span
            v-for="(fibNumber, i) in dp"
            :class="` w-[2rem] h-[2rem] rounded-full flex justify-center items-center text-white font-bold`"
            :key="i"
            >{{ i }}</span
          >
        </div>

        <div class="w-full flex justify-evenly items-center">
          <span class="p-4 text-yellow font-bold"> DP Table</span>
          <span
            v-for="(fibNumber, i) in dp"
            :class="`${
              fibNumber.highlight ? 'bg-[#D75725]' : 'bg-yellow'
            } w-[2rem] h-[2rem] rounded-full flex justify-center items-center text-white font-bold`"
            :key="i"
            >{{ fibNumber.value }}</span
          >
        </div>
      </div>
      <div
        class="desc w-full flex justify-center items-center text-white absolute bottom-[10%] text-[1.3rem]"
        v-html="desc"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
