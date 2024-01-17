<script setup>
import { useConceptsExplainStore } from '@/stores/ConceptsExplainSt'
import { gsap } from 'gsap'
import { storeToRefs } from 'pinia'
import { defineProps, onMounted, ref } from 'vue'
// ref
const isOpen = ref(null)
const ani = ref(null)
const conceptsExplainStore = useConceptsExplainStore()
const { nowConcept } = storeToRefs(conceptsExplainStore)
const props = defineProps(['title', 'contents', 'duration'])
onMounted(() => {
  gsap.from(ani.value, { opacity: 1, x: 40, duration: props.duration })
  // gsap.set(ani.value, { opacity: 0, x: 20 })
  // isOpen.value = gsap.to(ani.value, { opacity: 1, x: 0, duration: 1 }).reverse()
})
const handleContentOpen = () => {
  // isOpen.value.reversed(!isOpen.value.reversed())
}
const handleExplainOpen = () => {
  if (nowConcept.value == props.title) return
  console.log('handleExplainOpen', nowConcept.value)
  conceptsExplainStore.handleChangeConceptsExplain(props.title)
}
</script>

<template>
  <div class="flex justify-evenly items-center w-[100%] mt-4 mb-4">
    <p
      class="title max-h-[56px] flex items-center justify-center p-2 cursor-pointer font-bold rounded-lg text-[1.2rem] bg-[#D1AE45] w-[10rem]"
      @click="handleContentOpen"
    >
      {{ props.title }}
    </p>
    <div
      :class="`content p-2 w-[60%] rounded-lg flex flex-col bg-white cursor-default`"
      ref="ani"
      @mouseenter="handleExplainOpen"
    >
      <span
        v-for="(content, index) in props.contents"
        :key="index"
        class="flex items-center p-2"
        v-html="`${index + 1} . ${content}`"
      ></span>
    </div>
  </div>
</template>

<style scoped></style>
