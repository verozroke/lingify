<template>
  <div centered class="flex pr-5">
    <v-btn
      @click="() => router.push(link.url)"
      v-for="link in links"
      :key="link.name"
      class="text-transform-none"
      color="teal-accent-4"
      :text="link.name"
      :prepend-icon="'mdi-' + link.icon"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const links = [
  {
    name: "Home",
    url: "/",
    icon: "home",
  },
  {
    name: "Communities",
    url: "/communities",
    icon: "account-group",
  },
  {
    name: "Courses",
    url: "/courses",
    icon: "school",
  },
  {
    name: "FAQ",
    url: "/faq",
    icon: "frequently-asked-questions",
  },
  {
    name: "Price",
    url: "/pricing",
    icon: "cash",
  },
  {
    name: "Contact",
    url: "/contact-us",
    icon: "phone",
  },
];
</script>

<style scoped>
.text-transform-none {
  text-transform: none;
}
</style>
