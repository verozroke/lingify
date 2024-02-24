<template>
  <v-dialog
    v-model="dialog"
    width="500px"
  >
    <v-card
      :loading="isLoading"
      style="padding: 16px;"
    >
      <v-card-title>
        Create Post
      </v-card-title>
      <v-form
        @submit="createPost"
        class="p-4 flex flex-col gap-2"
      >
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='title'
          v-model="inputs.title"
          :rules="rules.title"
          placeholder="enter post title."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='text'
          v-model="inputs.text"
          :rules="rules.text"
          placeholder="enter text."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='image URL (optional)'
          v-model="inputs.imageUrl"
          :rules="rules.imageUrl"
          placeholder="enter image URL."
          type="text"
        />
      </v-form>
      <v-card-actions class="justify-end">
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="createPost"
          mode="elevated"
          :color="colors.EMERALD"
          text-color="white"
          prepend-icon="mdi-note-plus"
        >Create</UiButton>
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="dialog = false"
          mode="tonal"
          color="red"
          prepend-icon="mdi-close"
        >Close</UiButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { colors } from '~/core/colors';
import { useToast } from '~/hooks/use-toast';
import communityService, { type CreateCommunityPayload } from '~/services/community.service';
import postService, { type CreatePostPayload } from '~/services/post.service';
import { useRoute } from 'vue-router'
import { useCommunityStore } from '~/stores/CommunityStore';

const route = useRoute()
const { toast } = useToast()
const userStore = useUserStore()
const dialog = defineModel<boolean>()
const isLoading = ref(false)
const communityStore = useCommunityStore()

const inputs = ref({
  title: '',
  text: '',
  imageUrl: '',
})

const createPost = async () => {
  if (!userStore.user) {
    return
  }
  const { title, imageUrl, text } = inputs.value

  const payload: CreatePostPayload = {
    title,
    text,
    imageUrl,
    ownerId: userStore.user.id,
    communityId: route.params.communityId[0] as string
  }

  try {
    isLoading.value = true
    const newPost = await postService.createPost(payload)
    communityStore.posts.push(newPost)
    toast.success({ message: 'Post created successfully.' })
    isLoading.value = false
    dialog.value = false
  } catch (error) {
    toast.success({ message: 'Could not create post.' })
    isLoading.value = false
  }
}


const rules = ref({
  title: [
    (v: string) => !!v || 'name is required.'
  ],
  text: [
    (v: string) => !!v || 'language is required.'
  ],
  imageUrl: [
    (v: any) => !!v && isValidUrl(v) || 'Must be URL',
  ],
})



</script>

<style scoped></style>