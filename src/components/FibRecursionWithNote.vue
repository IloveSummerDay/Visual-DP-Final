<script setup>
import { ArrowLeftBold, ArrowRightBold, CaretRight, Right } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import prismjs from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-tomorrow.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getLeaveObj,
  handleAddChildren,
  handleRemoveChildren,
  itemStyles,
  loopTreeMap
} from '../gsap/fib-recursion-steps'
const treeBox = ref(null)
const n = ref(5)
const removes = ref([])
const echartTreeMap = ref(getLeaveObj(n.value))
const memo = ref({})
const highlight = ref([])
const aniPlaying = ref(false)
const memoNode = ref(null)
const disabled = ref(false)
const router = useRouter()
var myChart
let options = {
  series: [
    {
      type: 'tree',
      data: [echartTreeMap.value],
      symbolSize: 10,
      initialTreeDepth: 0,
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
  myChart = echarts.init(treeBox.value, null, {
    width: 'auto',
    height: 'auto'
  })
  prismjs.highlightAll()
  myChart.setOption(options)
})
const handleNext = () => {
  if (options.series[0].initialTreeDepth == n.value - 1 || aniPlaying.value) return
  handleAddChildren(echartTreeMap.value)
  // console.log('new tree', echartTreeMap.value)

  options.series[0].initialTreeDepth = options.series[0].initialTreeDepth + 1
  console.log('【next 当前initialTreeDepth】', options.series[0].initialTreeDepth)

  options.series[0].data = [echartTreeMap.value]
  myChart.setOption(options)
}
const handlePrev = () => {
  if (aniPlaying.value) return
  removes.value = handleRemoveChildren(echartTreeMap.value)
  // console.log('new tree', echartTreeMap.value, removes.value, memoNode.value, Object.keys(memo.value))

  options.series[0].initialTreeDepth =
    options.series[0].initialTreeDepth <= 1 ? 0 : options.series[0].initialTreeDepth - 1
  options.series[0].data = [echartTreeMap.value]
  //
  // 处理特殊情况:  prev到单个根节点时, 根节点颜色出现问题 //
  if (echartTreeMap.value.children.length == 0) {
    echartTreeMap.value.label = { backgroundColor: itemStyles[Number(echartTreeMap.value.name)] }
  }
  // 处理特殊情况:  prev到单个根节点时, 根节点颜色出现问题 //
  //
  console.log('【prev 当前initialTreeDepth】', options.series[0].initialTreeDepth)
  myChart.setOption(options)
}
// 开启动画
const handleVisualizeFib = () => {
  // 初始化/还原echart-tre
  if (aniPlaying.value) return
  aniPlaying.value = true
  disabled.value = true
  options.series[0].data = [getLeaveObj(n.value)]
  myChart.setOption(options)
  let data = getLeaveObj(n.value)
  let isNext = 1
  let isPrev = n.value
  // setInterval 开始执行动画
  let interval = setInterval(() => {
    if (isNext < n.value) {
      // 自动进行下一步动画
      options.series[0].initialTreeDepth = n.value - 1
      handleAddChildren(data)
      console.log('【next 当前initialTreeDepth】', options.series[0].initialTreeDepth)
      options.series[0].data = [data]
      myChart.setOption(options)
      isNext++
    } else if (isPrev >= 1) {
      // 自动进行上一步动画
      removes.value = handleRemoveChildren(data)
      memoNode.value = loopTreeMap(data)
      console.log('new tree', data, removes.value)

      // 加入备忘录动画
      memoNode.value = loopTreeMap(data)
      memo.value[Number(memoNode.value.name)] = memoNode.value.value
      let memoList = Object.keys(memo.value)
      console.log('memoList', memoList)
      highlight.value = []
      if (data.children.length == 0) {
        highlight.value = []
      } else memoList.length >= 2 ? highlight.value.push(...[memoList.length - 1, memoList.length - 2]) : ''

      // 更改echart-series-tree配置
      options.series[0].initialTreeDepth =
        options.series[0].initialTreeDepth <= 0 ? 0 : options.series[0].initialTreeDepth - 1
      options.series[0].data = [data]

      console.log('【prev 当前initialTreeDepth】', options.series[0].initialTreeDepth)
      myChart.setOption(options)
      isPrev--
    } else {
      // 恢复最初时状态
      console.log('***清除定时器***')
      if (data.children.length == 0) {
        data.label = { backgroundColor: itemStyles[Number(data.name)] }
        options.series[0].data = [data]
        myChart.setOption(options)
      }
      clearInterval(interval)
      aniPlaying.value = false
      disabled.value = false
      memo.value = {}
    }
  }, 1500)
}
// 改变 fib(n) 的n
const handleNChange = value => {
  console.log(value)
  echartTreeMap.value = getLeaveObj(value)
  options.series[0].data = [echartTreeMap.value]
  options.series[0].initialTreeDepth = 0
  myChart.setOption(options)
}
</script>

<template>
  <div class="flex h-full justify-evenly">
    <div class="flex flex-col justify-evenly items-center">
      <pre class="language-javaScript rounded-lg">
        <code class=" line-numbers">var fib = function(N) {  
          // 备忘录全初始化为 0  
          let memo = new Array(N + 1).fill(0);  
          return dp(memo, N); // 进行带备忘录的递归
        };
        
        // 带着备忘录进行递归
        var dp = function(memo, n) {
          if (n == 0 || n == 1) return n; // base case 
          // 已经计算过，不用再计算了 
          if (memo[n] != 0) return memo[n];
          memo[n] = dp(memo, n - 1) + dp(memo, n - 2);
          return memo[n];
        };</code>        
      </pre>
      <el-button
        type="primary"
        class="border-2"
        size="large"
        :auto-insert-space="true"
        @click="
          () => {
            router.push('/fib/recursion')
          }
        "
        >查看 未优化前的递归<el-icon class="ml-2"><Right /></el-icon
      ></el-button>
    </div>

    <div class="flex p-4 w-[60%] flex-col justify-evenly overflow-hidden">
      <div class="h-[10%] flex justify-evenly items-center">
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
          :disabled="disabled"
          @click="handlePrev"
          :icon="ArrowLeftBold"
          >Prev</el-button
        >
        <el-button
          type="primary"
          class="border-2"
          @click="handleNext"
          :disabled="disabled"
          >Next <el-icon class="el-icon--right"><ArrowRightBold /></el-icon
        ></el-button>
        <el-button
          type="primary"
          class="border-2"
          @click="handleVisualizeFib"
        >
          <el-icon size="1rem"><CaretRight /></el-icon>Visualize</el-button
        >
      </div>
      <div
        class="w-full h-full"
        ref="treeBox"
      ></div>
      <div class="h-[10%] flex justify-evenly items-center pl-4 pr-4">
        <p
          v-for="(memoVal, i) in Object.keys(memo)"
          :key="i"
          :class="` h-full flex justify-center items-center aspect-square rounded-full ${
            highlight.includes(i) ? 'bg-red-400' : 'bg-green-100'
          }`"
        >
          {{ memoVal }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
