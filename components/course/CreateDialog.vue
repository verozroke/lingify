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
        Create Course
      </v-card-title>
      <v-form
        @submit="createCourse"
        class="p-4 flex flex-col gap-2"
      >
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='Course Language'
          v-model="inputs.courseLanguage"
          :rules="rules.courseLanguage"
          placeholder="Type course lanuage."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='Native Language'
          v-model="inputs.nativeLanguage"
          :rules="rules.nativeLanguage"
          placeholder="Type your native lanuage."
          type="text"
        />
        <v-select
          label="Language Level"
          v-model="inputs.languageLevel"
          :items="levels"
          variant="outlined"
        >
        </v-select>
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='URL Аватарки'
          v-model="inputs.avatarUrl"
          :rules="rules.avatarUrl"
          placeholder="Введите URL аватарки."
          type="text"
        />
      </v-form>
      <v-card-actions class="justify-end">
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="createCourse"
          mode="elevated"
          :color="colors.EMERALD"
          text-color="white"
          prepend-icon="mdi-account-multiple-plus"
        >Создать</UiButton>
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="dialog = false"
          mode="tonal"
          color="red"
          prepend-icon="mdi-close"
        >Закрыть</UiButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { colors } from '~/core/colors';
import { useToast } from '~/hooks/use-toast';
import type { CreateCoursePayload } from '~/services/course.service';
import courseService from '~/services/course.service';

const router = useRouter()
const { toast } = useToast()
const userStore = useUserStore()
const dialog = defineModel<boolean>()
const isLoading = ref(false)

const levels = ref<string[]>([
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'C2',
])


const inputs = ref({
  courseLanguage: '',
  nativeLanguage: '',
  languageLevel: '',
  avatarUrl: ''
})



const createCourse = async () => {
  if (!userStore.user) {
    return
  }
  const { courseLanguage, nativeLanguage, languageLevel, avatarUrl } = inputs.value

  const payload: CreateCoursePayload = {
    courseLanguage,
    nativeLanguage,
    languageLevel,
    userId: userStore.user.id,
    avatarUrl,
  }

  try {
    isLoading.value = true
    const course = await courseService.createCourse(payload)
    toast.success({ message: 'Course created successfully.' })
    router.push(`/courses/${course.id}`)
    isLoading.value = false
  } catch (error) {
    toast.error({ message: 'Could not create course.' })
    isLoading.value = false
  }
}


const rules = ref({
  courseLanguage: [
    (v: string) => !!v || 'Course Language is required.'
  ],
  nativeLanguage: [
    (v: string) => !!v || 'Native language is required.'
  ],
  languageLevel: [
    (v: string) => !!v || 'Language level is required.'
  ],
  avatarUrl: [
    (v: string) => !!v || 'avatarUrl is required.',
    (v: any) => isValidUrl(v) || 'Must be URL',
  ],
})



</script>

<style scoped></style>