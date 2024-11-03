<template>
  <section class="bg-slate-50 min-h-screen">
    <div class="container px-6 py-10 mx-auto">
      <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl ">Курсы</h1>
      <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
        Выберите курс, чтобы продолжить свое изучение языков
      </p>
      <CourseCreateDialog v-model="dialog" />
      <div class="w-full flex items-center flex-wrap">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
        <CourseAddCard @click="dialog = true" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Course } from '~/core/types/course';
import courseService from '~/services/course.service';


const router = useRouter()
const dialog = ref(false)
const userStore = useUserStore()

const courses = ref<Course[]>([])




onMounted(async () => {
  await userStore.getUser()
  courses.value = await courseService.getCourses(userStore.user!.id)

})
</script>

<style scoped></style>