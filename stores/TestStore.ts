import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('TestStore', () => {
  const count = ref(0)
  return {
    count
  }
})