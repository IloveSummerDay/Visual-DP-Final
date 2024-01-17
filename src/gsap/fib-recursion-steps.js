// -------------------- 暴力递归 -------------------- //
// 以 record 为根节点，返回 fib(n) 的节点对象
export function fibRecursionSteps(n, record) {
  if (n < 2) {
    record = {
      value: n,
      name: `fib(${n})`,
      children: [],
      emphasis: { focus: 'ancestor' }
    }
    return record
  }
  record.value = fibs[n]
  record.name = `fib(${n})`
  record.itemStyle = { color: itemStyles[n] }
  record.label = { backgroundColor: itemStyles[n] }
  record.children = []
  record.emphasis = { focus: 'ancestor' }
  let c1 = fibRecursionSteps(n - 1, {})
  let c2 = fibRecursionSteps(n - 2, {})
  record.children.push(c1)
  record.children.push(c2)
  return record
}

// -------------------- 带 备忘录 的递归 -------------------- //
// tools
var fib = function (N) {
  if (N === 1 || N === 2) return 1
  return fib(N - 1) + fib(N - 2)
}
var fibs = { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 5, 6: 8, 7: 13, 8: 21, 9: 34, 10: 55 }
export var itemStyles = {
  0: '#763262',
  1: '#6CB7DA',
  2: '#E9A621',
  3: 'pink',
  4: 'white',
  5: '#D46934',
  6: '#69B7CE',
  7: '#71BF50',
  8: '#8CABD9',
  9: '#ECA063',
  10: '#529DCB'
}
//
export const getLeaveObj = (n, isMax = false) => {
  return {
    value: fibs[n],
    name: n,
    children: [],
    // itemStyle: { color: itemStyles[n] },
    label: { backgroundColor: isMax ? '#bfc' : itemStyles[n] }
  }
}
// 每次返回一部分递归对象 沿着大子加子
export function handleAddChildren(treeNode) {
  if (treeNode.name !== '1' && treeNode.name !== '0' && treeNode.children.length == 0) {
    treeNode.children.push(getLeaveObj(Number(treeNode.name) - 1, true))
    treeNode.children.push(getLeaveObj(Number(treeNode.name) - 2))
    return
    // ....
  } else if (treeNode.name == '1' || treeNode.name == '0') {
    return
  } else {
    handleAddChildren(treeNode.children[0])
  }
}
// 递归返回 每次去掉两片叶子
export function handleRemoveChildren(treeNode) {
  let removes
  if (treeNode.children.length == 0) return
  else if (treeNode.children[0].children.length == 0) {
    treeNode.label = { backgroundColor: 'red' }
    removes = treeNode.children
    treeNode.children = []
    return removes
  } else {
    removes = handleRemoveChildren(treeNode.children[0])
  }
  return removes
}

// 遍历树并返回较大的叶子节点
export function loopTreeMap(treeNode) {
  let leaveNode = undefined
  if (treeNode.children.length == 0) {
    return treeNode
  } else {
    leaveNode = loopTreeMap(treeNode.children[0])
  }
  return leaveNode
}

// -------------------- dp table自底向上推算 -------------------- //
import { gsap } from 'gsap'
// desc: 初始化 dp[n + 1]
export function aniStep_1(dp, n, nowFibNumber) {
  dp = new Array(n + 1).fill({
    value: 0,
    highlight: false
  })
  return dp
}
// desc: 赋值dp[0], dp[1]
export function aniStep_2(dp, n, nowFibNumber) {
  dp[0] = {
    value: 0,
    highlight: true
  }
  dp[1] = {
    value: 1,
    highlight: true
  }
  return dp
}
// for 循环动画: dp[i - 1] + dp[i - 2] 推算得到 dp[i] 之前高亮
// desc: `i = ${n}, dp[${n - 1}] + dp[${n - 2}] -> dp[${n}]`
export function aniSteps_beford_sum(dp, n, i) {
  // 取消高亮，重新高亮
  for (let v = 0; v <= i; v++) {
    dp[v] = {
      value: dp[v].value,
      highlight: false
    }
  }
  dp[i - 1] = {
    value: dp[i - 1].value,
    highlight: true
  }
  dp[i - 2] = {
    value: dp[i - 2].value,
    highlight: true
  }
  return dp
}
// for 循环动画: dp[i - 1] + dp[i - 2] 推算得到 dp[i]
// desc: `i = ${n}, dp[${n}]`
export function aniSteps_sum(dp, n, i) {
  // 取消高亮，重新高亮
  for (let v = 0; v <= i; v++) {
    dp[v] = {
      value: dp[v].value,
      highlight: false
    }
  }
  dp[i] = {
    value: dp[i - 1].value + dp[i - 2].value,
    highlight: true
  }
  return dp
}
// -------------------- 最终优化算法 -------------------- //
// yoyo 左右晃动
export function gsap_yoyo(el, duration) {
  gsap.to(el, {
    duration: duration * 0.2,
    x: 10,
    yoyo: true,
    repeat: 5
  })
}
// 更改旁注文本
export function gsap_text(desc, duration, descTxt, text = '我是一段修改后的文字') {
  gsap.to(desc.value, {
    duration: duration,
    opacity: 0,
    onComplete: () => {
      descTxt.value = text
      gsap.to(desc.value, { duration: duration, opacity: 1 })
    }
  })
}

// dp_i_1 -> dp_i_2
export function gsap_1_2(dp_i_1, dp_i_2, dp_i_1_number, dp_i_2_number, duration = 1) {
  console.log('dp_i_1 -> dp_i_2')
  return gsap.to(dp_i_1.value, {
    rotation: 720,
    duration: duration,
    scale: 0.2,
    opacity: 0.2,
    x:
      Math.floor(dp_i_2.value.getBoundingClientRect().left + dp_i_2.value.getBoundingClientRect().width / 2) -
      Math.floor(dp_i_1.value.getBoundingClientRect().left + dp_i_1.value.getBoundingClientRect().width / 2),
    y: 0,
    onComplete: () => {
      gsap.fromTo(
        dp_i_1.value,
        {
          x: 0,
          y: 0,
          rotation: 0
        },
        {
          scale: 1,
          opacity: 1,
          onStart: () => {
            dp_i_2_number.value = dp_i_1_number.value
          }
        }
      )
    }
  })
}
// dp_i -> dp_i_1
export function gsap_i_1(dp_i_1, dp_i, dp_i_1_number, dp_i_number, duration = 1) {
  console.log('dp_i -> dp_i_1')
  return gsap.to(dp_i.value, {
    rotation: 720,
    duration: duration,
    scale: 0.2,
    opacity: 0.2,
    x: -(
      Math.floor(dp_i.value.getBoundingClientRect().left + dp_i.value.getBoundingClientRect().width / 2) -
      Math.floor(dp_i_1.value.getBoundingClientRect().left + dp_i_1.value.getBoundingClientRect().width / 2)
    ),
    y: -(
      Math.floor(dp_i.value.getBoundingClientRect().top + dp_i.value.getBoundingClientRect().width / 2) -
      Math.floor(dp_i_1.value.getBoundingClientRect().top + dp_i_1.value.getBoundingClientRect().width / 2)
    ),
    onComplete: () => {
      gsap.fromTo(
        dp_i.value,
        {
          x: 0,
          y: 0,
          rotation: 0
        },
        {
          scale: 1,
          opacity: 1,
          onStart: () => {
            dp_i_1_number.value = dp_i_number.value
          }
        }
      )
    }
  })
}
