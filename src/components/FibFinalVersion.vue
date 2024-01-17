<script setup>
import { CaretRight, Notebook } from '@element-plus/icons-vue'
import { gsap } from 'gsap'
import prismjs from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-tomorrow.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { gsap_1_2, gsap_i_1, gsap_text, gsap_yoyo } from '../gsap/fib-recursion-steps'
const n = ref(5)
const desc = ref(null)
const descTxt = ref('点击 Visualize 按钮开启可视化')
const dp_i_refs = ref(null) // 0:dp_i_1, 1:dp_i_2, 2:dp_i
const router = useRouter()
const dp_i_1 = ref(null)
const dp_i_2 = ref(null)
const dp_i = ref(null)
const dp_i_1_number = ref(0)
const dp_i_2_number = ref(0)
const dp_i_number = ref(0)
const add = ref(null)
const duration = 1
const dp_i_map = ref([dp_i_1_number, dp_i_2_number, dp_i_number])
const aniSteps = ref([])
const disabled = ref(false)
const aniPlaying = ref(false)
const aniStepsIndex = ref(0) // max-length: 2n - 1
const i = ref(1) //
let scale_i_1
let rotate_i_1
let rotate_1_2

onMounted(() => {
  dp_i_1.value = dp_i_refs.value[0]
  dp_i_2.value = dp_i_refs.value[1]
  dp_i.value = dp_i_refs.value[2]
  add.value.style.left =
    Math.floor(
      (dp_i_1.value.getBoundingClientRect().left +
        dp_i_1.value.getBoundingClientRect().width / 2 +
        dp_i_2.value.getBoundingClientRect().left +
        dp_i_2.value.getBoundingClientRect().width / 2) /
        2
    ) + 'px'
  add.value.style.top =
    Math.floor(dp_i_1.value.getBoundingClientRect().top + dp_i_1.value.getBoundingClientRect().height / 2) + 'px'
  // add.value.style.opacity = 1
  add.value.style.transform = 'translate(-50%, -50%)'

  prismjs.highlightAll()
  handleInitAniSteps()
})

function handleInitAniSteps() {
  aniSteps.value.push(() => {
    gsap_text(desc, duration * 0.2, descTxt, '初始化 dp[i - 1] 和 dp[i - 2]')
    gsap_yoyo(dp_i_1.value, duration)
    gsap_yoyo(dp_i_2.value, duration)
    dp_i_1_number.value = 1
    dp_i_2_number.value = 0
  })
  for (let k = 0, j = 0; j < n.value - 1; k += 2, j++) {
    aniSteps.value[k + 1] = () => {
      gsap_text(desc, duration * 0.2, descTxt, `i = ${i.value}, let dp_i = dp_i_1 + dp_i_2`)
      gsap.to([dp_i_1.value, dp_i_2.value], {
        y: 10,
        duration: duration * 0.5,
        yoyo: true,
        repeat: 1
      })
      gsap.to(dp_i.value, {
        backgroundColor: '#D1AE45',
        yoyo: true,
        repeat: 1,
        duration: duration * 0.5
      })
      gsap.to(add.value, {
        duration: duration * 0.5,
        opacity: 1,
        y: 10,
        yoyo: true,
        repeat: 1
      })
      dp_i_number.value = dp_i_1_number.value + dp_i_2_number.value
    }
    aniSteps.value[k + 2] = () => {
      gsap_text(desc, duration * 0.5, descTxt, '滚动更新  dp_i_2 = dp_i_1; dp_i_1 = dp_i;')
      // 先 dp_i_1 -> dp_i_2 动画
      // 更新 dp_i_2_number 的值
      rotate_1_2 = gsap_1_2(dp_i_1, dp_i_2, dp_i_1_number, dp_i_2_number, duration)
      // ---------------------- //
      // 再 dp_i -> dp_i_1 动画
      // 更新 dp_i_1_number 的值
      rotate_i_1 = gsap_i_1(dp_i_1, dp_i, dp_i_1_number, dp_i_number, duration)
      // dp_i_number 的值不动（根据源代码）
    }
  }
}

// 改变 fib(n) 的n
const handleNChange = value => {
  n.value = value
  handleInitAniSteps()
}
const handleVisualizeFib = () => {
  if (aniPlaying.value) return
  // 恢复初始值
  aniStepsIndex.value = 0
  disabled.value = true
  aniPlaying.value = true
  i.value = 1
  dp_i_1_number.value = 0
  dp_i_2_number.value = 0
  dp_i_number.value = 0
  scale_i_1 && scale_i_1.reverse()
  let interval = setInterval(() => {
    if (aniStepsIndex.value < n.value * 2 - 1) {
      if (aniStepsIndex.value == 0) {
        aniSteps.value[aniStepsIndex.value]()
      } else {
        if (aniStepsIndex.value % 2 !== 0) i.value++
        aniSteps.value[aniStepsIndex.value]()
      }
      aniStepsIndex.value++
      console.log(`aniStepsIndex < ${n.value * 2 - 1}`, aniStepsIndex.value)
    } else {
      clearInterval(interval)
      disabled.value = false
      aniPlaying.value = false
      gsap_text(desc, duration * 0.5, descTxt, '可视化结束, return dp_i_1')
      scale_i_1 = gsap.to(dp_i_1.value, {
        duration: 0.5,
        backgroundColor: '#D75725',
        color: '#fff',
        fontSize: '2rem',
        ease: 'power2.out',
        scale: 2
      })
    }
  }, 2000)
}
</script>

<template>
  <div class="flex h-full justify-center">
    <div class="flex flex-col justify-evenly items-center">
      <pre class="language-javaScript rounded-lg">
        <code class=" line-numbers">var fib = function(n) {
          if (n === 0 || n === 1) {
              // base case
              return n;
          }
          // 分别代表 dp[i - 1] 和 dp[i - 2]
          let dp_i_1 = 1, dp_i_2 = 0;
          for (let i = 2; i &lt;= n; i++) {
              // dp[i] = dp[i - 1] + dp[i - 2];
              let dp_i = dp_i_1 + dp_i_2;
              // 滚动更新
              dp_i_2 = dp_i_1;
              dp_i_1 = dp_i;
          }
          return dp_i_1;
        };</code>
      </pre>
      <el-button
        type="primary"
        class="border-2"
        size="large"
        @click="
          () => {
            router.push('/fib/iteration')
          }
        "
        >查看 dp数组的迭代（递推）解法<el-icon class="ml-2"><Notebook /></el-icon
      ></el-button>
    </div>
    <div class="flex flex-1 flex-col items-center justify-evenly">
      <div class="h-[10%] w-full flex justify-evenly items-center">
        <p class="flex">
          <span class="mr-4 text-white">N = </span>
          <el-input-number
            :disabled="disabled"
            v-model="n"
            :min="2"
            :max="10"
            @change="handleNChange"
          />
        </p>
        <el-button
          type="primary"
          class="border-2"
          @click="handleVisualizeFib"
        >
          <el-icon size="1rem"><CaretRight /></el-icon>Visualize</el-button
        >
      </div>

      <p
        class="bg-orange font-bold p-2 rounded-lg text-white"
        ref="desc"
      >
        {{ descTxt }}
      </p>

      <div class="w-full h-[70%] flex flex-wrap justify-evenly items-center">
        <div
          class="w-[40%] aspect-[1/0.5] flex-col flex justify-evenly items-center rounded-lg"
          v-for="(text, i) in ['dp_i_1', 'dp_i_2', 'dp_i (临时变量)']"
          :key="i"
        >
          <p class="font-bold text-center text-white">{{ text }}</p>
          <p
            ref="dp_i_refs"
            class="p-4 rounded-lg aspect-square bg-white text-orange font-bold text-[2rem] flex justify-evenly items-center"
          >
            {{ dp_i_map[i].value }}
          </p>
        </div>
        <img
          ref="add"
          class="absolute w-[2rem] opacity-0 origin-center"
          src="/add.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
