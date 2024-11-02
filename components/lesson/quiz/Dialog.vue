<template>
  <v-dialog
    v-model="dialog"
    width="700px"
  >
    <v-card
      :loading="isLoading"
      style="padding: 16px;"
    >
      <v-card-title>
        Тест за урок: {{ questionPayload.lessonName }}
      </v-card-title>
      <v-form
        @submit="checkQuiz"
        class="p-4 flex flex-col gap-2 relative"
      >
        <LoaderSpinner
          style="position:static"
          v-if="isLoading"
        />
        <div
          class="flex flex-col gap-2"
          v-for="(question, i) in questions"
          :key="question.question"
        >
          <p>{{ i + 1 }}. {{ question.question }}</p>
          <v-radio-group v-model="question.selectedVariant">
            <v-radio
              :color="colors.SEAGREEN"
              v-for="variant in question.variants"
              :label="variant.letter + '. ' + variant.answer"
              :value="variant.letter"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-form>
      <v-card-actions class="justify-end">
        <div
          class="text-oxford text-lg leading-3 mx-4 font-medium"
          v-if="quizResult"
        >Результат: {{ quizResult }}</div>
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="checkQuiz"
          mode="elevated"
          :color="colors.EMERALD"
          text-color="white"
          prepend-icon="mdi-check-all"
        >Check results</UiButton>
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
import type { GetQuestionsPayload, Question } from '~/services/chat-gpt.service';
import chatGPTService from '~/services/chat-gpt.service';



const router = useRouter()
const { toast } = useToast()
const userStore = useUserStore()
const dialog = defineModel<boolean>()
const isLoading = ref(false)

const questions = ref<Question[]>([])
const quizResult = ref('')

const props = defineProps<{
  questionPayload: GetQuestionsPayload
}>()
const fetchQuiz = async () => {
  try {
    isLoading.value = true
    const fetchedQuestions: Question[] = await chatGPTService.getQuestions(props.questionPayload)
    questions.value = fetchedQuestions
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    toast.success({ message: 'Could not fetch questions.' })
  }
}

watch(dialog, async () => {
  if (dialog.value) {
    await fetchQuiz()
  } else {
    quizResult.value = ''
    questions.value = []
  }
})


const checkQuiz = async () => {
  if (!userStore.user) {
    return
  }
  const correctAnswerLength = questions.value.reduce((acc, question) => acc + (question.correctAnswer === question.selectedVariant ? 1 : 0), 0)
  quizResult.value = `${correctAnswerLength}/5`
}



</script>

<style scoped></style>