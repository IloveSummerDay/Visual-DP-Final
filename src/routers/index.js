import { createRouter, createWebHistory } from 'vue-router'
import FibFinalVersion from '../components/FibFinalVersion.vue'
import FibIteration from '../components/FibIteration.vue'
import FibRecursion from '../components/FibRecursion.vue'
import FibRecursionWithNote from '../components/FibRecursionWithNote.vue'
import BasicConcepts from '../pages/BasicConcepts.vue'
import Fib from '../pages/Fib.vue'
import HelloWorld from '../pages/HelloWorld.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HelloWorld },
    {
      path: '/base',
      component: BasicConcepts
    },
    {
      path: '/fib',
      component: Fib,
      children: [
        {
          path: 'recursion',
          component: FibRecursion
        },
        {
          path: 'dp',
          component: FibRecursionWithNote
        },
        {
          path: 'iteration',
          component: FibIteration
        },
        {
          path: 'final',
          component: FibFinalVersion
        }
      ]
    },
    {
      path: '/summary',
      component: () => import('../pages/Summary.vue')
    }
  ]
})
