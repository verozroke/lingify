<template>
  <section class="bg-slate-50 min-h-screen">
    <v-bottom-sheet v-model="sheet">
      <v-card
        class="text-center"
        height="200"
      >
        <v-card-text>
          <br>
          <h1 class="text-lg　font-bold">Материалы: </h1>
          <br>
          <div class="flex flex-col gap-4">
            <a
              v-for="material in materials"
              :key="material.id"
              :href="material.url"
              class="text-blue-500 underline"
            >{{ material.name }}</a>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <div class="container px-6 py-10 mx-auto">
      <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Курс языка "{{
        course?.name }}"</h1>

      <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
        Проходите курс по списку!
      </p>
      <div class="border-l-2 mt-10">
        <div
          v-for="(lesson, i) in course?.lessons"
          :key="lesson.id"
          :class="[`bg-${LessonColorMap[i as keyof typeof LessonColorMap]}-500`]"
          class="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4  text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0"
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
import { CourseMap, LessonColorMap, type Course, type Material } from '~/core/types/course';
import { useToast } from '~/hooks/use-toast';
import courseService from '~/services/course.service';


const route = useRoute()
const userStore = useUserStore()
const { toast } = useToast()

const course = ref<Course>()
const materials = ref<Material[]>()
const isLoading = ref(false)

const fetchCourse = async () => {
  try {
    isLoading.value = true
    const fetchedCourse = await courseService.getCourse(CourseMap[route.params.courseName[0] as keyof typeof CourseMap] as string)
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

</script>

<style scoped></style>