<template>
  <div class="absolute inset-0 py-28 bg-slate-100">
    <div class="container px-24 py-5">
      <div class="text-5xl font-bold w-full mt-4 leading-normal text-oxford">Settings</div>
      <div class="text-base font-medium w-full leading-10 text-slate-500">Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Nostrum quasi odio ab facilis, exercitationem iure?
      </div>
    </div>
    <div class="container px-24 py-5 flex gap-4 justify-center">
      <v-tabs
        align-tabs="start"
        class="w-48"
        density="compact"
        v-model="settingStore.tab"
        direction="vertical"
        color="#28B0A6"
      >
        <v-tab
          style="text-transform: none;"
          value="account"
        >
          <v-icon start>
            mdi-account
          </v-icon>
          Account
        </v-tab>
        <v-tab
          style="text-transform: none;"
          value="theme"
        >
          <v-icon start>
            mdi-theme-light-dark
          </v-icon>
          Theme
        </v-tab>
      </v-tabs>
      <v-window
        class="flex-grow"
        v-model="settingStore.tab"
      >
        <v-window-item value="account">
          <SettingsAccount />
        </v-window-item>
        <v-window-item value="theme">
          <SettingsTheme />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script setup lang="ts">
const settingStore = useSettingStore()
const userStore = useUserStore()

useHead({
  title: "Settings | Touri"
})

onMounted(async () => {
  await userStore.getUser()
  window.scrollTo(0, 0)

  settingStore.setBasicValues()
})

</script>

<style scoped></style>