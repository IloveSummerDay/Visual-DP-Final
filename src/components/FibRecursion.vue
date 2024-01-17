<script setup>
import { ArrowLeftBold, ArrowRightBold, Notebook } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import prismjs from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-tomorrow.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fibRecursionSteps } from '../gsap/fib-recursion-steps'
const tree = ref(null)
const echartTreeMap = ref({})
const n = ref(5)
const router = useRouter()
var myChart
let options = {
  series: [
    {
      type: 'tree',
      data: [echartTreeMap.value],
      symbolSize: 10,
      initialTreeDepth: 1,
      lineStyle: {
        width: 3
      },
      label: {
        backgroundColor: '#bfc',
        position: 'top',
        distance: 20,
        fontSize: 16,
        verticalAlign: 'middle',
        padding: [4, 10],
        borderRadius: 4
      },
      leaves: {
        label: {
          distance: 5,
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      }
    }
  ]
}
onMounted(() => {
  fibRecursionSteps(n.value, echartTreeMap.value)
  console.log(echartTreeMap.value)
  myChart = echarts.init(tree.value, null, {
    width: 'auto',
    height: 'auto'
  })
  prismjs.highlightAll()
  myChart.setOption(options)
})
const handleNext = () => {
  if (options.series[0].initialTreeDepth == n.value - 1) return
  options.series[0].initialTreeDepth = options.series[0].initialTreeDepth + 1
  console.log('next', options.series[0].initialTreeDepth)
  myChart.setOption(options)
}
const handlePrev = () => {
  console.log('prev', options.series[0].initialTreeDepth)
  options.series[0].initialTreeDepth =
    options.series[0].initialTreeDepth <= 1 ? 1 : options.series[0].initialTreeDepth - 1
  myChart.setOption(options)
}
// 改变 fib(n) 的n
const handleNChange = value => {
  console.log(value)
  fibRecursionSteps(value, echartTreeMap.value)
  options.series[0].data = [echartTreeMap.value]
  options.series[0].initialTreeDepth = 1
  myChart.setOption(options)
}
</script>

<template>
  <div class="flex h-full justify-center">
    <div class="flex flex-col justify-evenly items-center">
      <pre class="language-javaScript rounded-lg">
        <code class=" line-numbers">// 可视化状态(n) 
        // 状态转移方程: fib(n) = fib(n - 1) + fib(n - 2)
        var fib = function(n) { 
          if ( 2 > n ) {
            return n 
          }
          return fib(n - 1) +fib(n - 2);
        }</code>
      </pre>
      <el-button
        type="primary"
        class="border-2"
        size="large"
        @click="
          () => {
            router.push('/fib/dp')
          }
        "
        >查看 优化后的递归（带备忘录）<el-icon class="ml-2"><Notebook /></el-icon
      ></el-button>
    </div>
    <div class="flex flex-1 flex-col justify-evenly">
      <div class="h-[10%] flex justify-evenly items-center">
        <el-input-number
          v-model="n"
          :min="2"
          :max="10"
          @change="handleNChange"
        />
        <el-button
          class="border-2"
          type="primary"
          @click="handlePrev"
          :icon="ArrowLeftBold"
          >Prev</el-button
        >
        <el-button
          type="primary"
          class="border-2"
          @click="handleNext"
          >Next <el-icon class="el-icon--right"><ArrowRightBold /></el-icon
        ></el-button>
      </div>
      <div
        class="w-full h-full"
        ref="tree"
      ></div>
    </div>
  </div>
</template>

<style scoped></style>
