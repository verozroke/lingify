<template>
  <div
    @click.self="() => router.push(`/c/${community.id}`)"
    v-ripple
    class="flex flex-col text-slate-400 items-center p-8 transition-colors duration-200 transform cursor-pointer group hover:bg-slate-100 rounded-xl"
  >
    <img
      class="object-cover w-32 h-32 rounded-full ring-4 ring-slate-300"
      :src="community.avatar.url"
      alt="Community Avatar"
    >

    <h1 class="mt-4 text-2xl font-semibold text-slate-700 capitalize dark:text-white ">{{
      community.name }}</h1>

    <p class="mt-2 text-slate-500 capitalize dark:text-slate-300 ">язык: {{ community.language
    }}</p>

    <div class="flex mt-3 gap-2 -mx-2 items-center">

      <SubscribeButton
        :community-id="community.id"
        :is-subscriber="isSubscriber(community.subscribers)"
      />
      <NuxtLink :to="`/c/${community.id}`">
        <UiButton
          density="comfortable"
          mode="elevated"
          style="border-radius: 5px;"
          :text-color="colors.SEAGREEN"
          :icon="true"
          :color="colors.BG_SLATE"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { colors } from '~/core/colors';
import type { Community, Subscriber } from '~/core/types/community'


const router = useRouter()
const userStore = useUserStore()

defineProps<{
  community: Community
}>()

const isSubscriber = (subscribers: Subscriber[]) => !!subscribers.find(s => s.userId === userStore.user?.id)

</script>

<style scoped></style>