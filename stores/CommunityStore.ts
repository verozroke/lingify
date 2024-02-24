import { defineStore } from 'pinia'
import type { Community, Post } from '~/core/types/community'

export const useCommunityStore = defineStore('CommunityStore', () => {
  const community = ref<Community>({} as Community)
  const posts = ref<Post[]>([])

  return {
    posts,
    community
  }
})