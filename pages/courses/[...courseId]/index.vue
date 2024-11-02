<template>
  <section class="bg-slate-50 min-h-screen">
    <CourseMaterialDialog
      v-model="materialDialog"
      :material
    />
    <v-bottom-sheet v-model="sheet">
      <v-card
        class="text-center"
        height="500"
      >
        <v-card-text>
          <br>
          <h1 class="text-lg　font-bold">Материалы: </h1>
          <br>
          <div class="flex flex-col gap-6">
            <span
              @click="openMaterial(material)"
              v-for="material in materials"
              :key="material.id"
              :href="material.description"
              class="text-xl w-fit text-center mx-auto hover:text-oxford font-bold leading-4 text-oxford/70 transition-all cursor-pointer"
            >{{ material.name }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <LessonQuizDialog
      :question-payload="{
        courseName: course ? course.name : 'Русский',
        keyWords: openedLesson ? openedLesson.keyWords : '',
        lessonDescription: openedLesson ? openedLesson.description : '',
        lessonName: openedLesson ? openedLesson.name : '',
        userInfo: JSON.stringify({
          nickname: userStore.user?.nickname
        }),
        nativeLanguage: course ? course.nativeLanguage : ''
      }"
      v-model="dialog"
    />
    <div class="container px-6 py-10 mx-auto">
      <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl ">Курс языка "{{
        course?.name }}"</h1>

      <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
        Проходите курс по списку!
      </p>
      <div class="border-l-2 mt-10">
        <div
          v-for="(lesson, i) in course?.lessons"
          :key="lesson.id"
          class="transform bg-seagreen transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4  text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0"
        >

          <div class="w-5 h-5 bg-blue-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0">
          </div>
          <div class="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>
          <div class="flex-auto">
            <h1 class="text-lg">Урок {{ i + 1 }}</h1>
            <h1 class="text-xl font-bold">{{ lesson.name }}</h1>
            <h3>{{ lesson.description }}</h3>
          </div>
          <div class="flex flex-col gap-2">
            <UiButton
              @click="() => {
                materials = lesson.materials
                sheet = true
              }"
              mode="elevated"
              color="#fff"
              prepend-icon="mdi-text-box"
            >
              Материалы
            </UiButton>
            <UiButton
              @click="() => openQuiz(lesson)"
              mode="elevated"
              color="#fff"
              prepend-icon="mdi-file-document-edit"
            >
              Пройти тест
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { type Course, type Lesson, type Material } from '~/core/types/course';
import { useToast } from '~/hooks/use-toast';
import courseService from '~/services/course.service';


const route = useRoute()
const userStore = useUserStore()
const { toast } = useToast()

const course = ref<Course>()
const materials = ref<Material[]>()
const material = ref<Material | null>(null)
const isLoading = ref(false)
const openedLesson = ref<Lesson>()


const openMaterial = (currentMaterial: Material) => {
  material.value = currentMaterial
  materialDialog.value = true
}

const fetchCourse = async () => {
  try {
    isLoading.value = true
    const fetchedCourse = await courseService.getCourse(route.params.courseId[0] as string)
    course.value = fetchedCourse
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    toast.error({ message: 'Could not fetch course' })
  }
}

onMounted(async () => {
  await userStore.getUser()
  await fetchCourse()
})


const sheet = ref(false)
const dialog = ref(false)
const materialDialog = ref(false)


const openQuiz = async (lesson: Lesson) => {
  dialog.value = true
  openedLesson.value = lesson
}

</script>

<style scoped></style>