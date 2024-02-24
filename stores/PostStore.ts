import { defineStore } from 'pinia'

export const usePostStore = defineStore('PostStore', () => {
  const commentInput = ref('')

  return {
    commentInput
  }
})