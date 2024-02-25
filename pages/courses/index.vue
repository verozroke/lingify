<template>
  <section class="bg-slate-50 min-h-screen">
    <div class="container px-6 py-10 mx-auto">
      <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Курсы</h1>
      <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
        Выберите курс, чтобы продолжить свое изучение языков
      </p>
      <div class="w-full flex items-center">
        <CourseCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const router = useRouter()
const userStore = useUserStore()

const courses = ref([
  {
    id: 1,
    name: 'Русский',
    url: 'russian',
    color: 'orange',
    logoImageUrl: 'https://images.emojiterra.com/twitter/v13.1/512px/1f1f7-1f1fa.png'
  },
  {
    id: 2,
    name: 'Казахский',
    url: 'kazakh',
    color: 'indigo',
    logoImageUrl: 'https://images.emojiterra.com/twitter/v14.0/1024px/1f1f0-1f1ff.png'
  },
  {
    id: 3,
    name: 'Английский',
    url: 'english',
    color: 'teal',
    logoImageUrl: 'https://images.emojiterra.com/twitter/v14.0/1024px/1f1fa-1f1f8.png'
  },
  {
    id: 4,
    name: 'Японский',
    url: 'japanese',
    color: 'sky',
    logoImageUrl: 'https://images.emojiterra.com/twitter/v14.0/1024px/1f1ef-1f1f5.png'
  },
])


onMounted(async () => {
  await userStore.getUser()
})
</script>

<style scoped></style>