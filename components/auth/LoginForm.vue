<template>
  <v-form
    @submit.prevent="onLogin"
    ref="loginForm"
    class="flex flex-col w-[400px]"
  >
    <h3 class="text-3xl text-black font-bold mb-2">welcome back.</h3>
    <h5 class="text-sm text-slate-600">didn't sign up yet? <span
        @click="() => router.push('/register')"
        class="underline cursor-pointer underline-offset-2"
      >create a lingify account.</span></h5>
    <div class="flex w-full flex-col py-4 gap-1">
      <UiInput
        label='nickname'
        v-model="nickname"
        :rules="nicknameRules"
        :counter="20"
        placeholder="enter your nickname."
        type="text"
      />
      <UiInput
        label='password'
        v-model="password"
        :rules="passwordRules"
        placeholder="enter your password."
        type="text"
      />
    </div>
    <div class="flex justify-end">
      <UiButton
        type="submit"
        class="-mt-4"
        mode='elevated'
        color="teal-accent-4"
        text-color="white"
      >sign in.
      </UiButton>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { colorsEnum } from '~/core/colors';
import authService, { type LoginUserValidator } from '~/services/auth.service';

const router = useRouter()

const nickname = ref('')
const password = ref('')

const loginForm = ref(null)
const isValid = async () => {
  //@ts-expect-error loginForm type gives automaticcaly in vuetify
  const { valid } = await loginForm.value!.validate()
  return valid
}
const resetForm = () => {
  //@ts-expect-error loginForm type gives automaticcaly in vuetify
  loginForm.value?.reset()
}

const isLoading = ref(false)
const toastStore = useToastStore()
const userStore = useUserStore()

const onLogin = async () => {
  const payload: LoginUserValidator = {
    nickname: nickname.value,
    password: password.value,
  }


  if (await isValid()) {

    try {
      isLoading.value = true
      const message = await authService.login(payload)
      isLoading.value = false
      userStore.isAuthenticated = true
      toastStore.openSnackbar(message, 3000, colorsEnum.EMERALD)
      resetForm()
      router.push('/profile')
    } catch (e) {
      isLoading.value = false
      toastStore.openSnackbar('Произошла ошибка.', 3000, colorsEnum.RED)
    }
  }
}

const nicknameRules = ref([
  (v: string) => !!v || 'nickname is required.'
])

const passwordRules = ref([
  (v: string) => !!v || 'password is required.'
])
</script>

<style scoped></style>