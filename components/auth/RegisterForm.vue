<template>
  <v-form
    @submit.prevent="onRegister"
    ref="registerForm"
    class="flex flex-col w-[400px]"
  >
    <h3 class="text-3xl text-black font-bold mb-2">welcome to lingify.</h3>
    <h5 class="text-sm text-slate-600">already have lingify account? <span
        @click="() => router.push('/login')"
        class="underline cursor-pointer underline-offset-2"
      >sign in.</span></h5>
    <div class="flex w-full flex-col py-4 gap-1">
      <UiInput
        label='email'
        v-model="email"
        :rules="emailRules"
        placeholder="enter your email."
        type="text"
      />
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
      <UiInput
        label='repeat password'
        v-model="passwordConfirm"
        :rules="passwordRules"
        placeholder="repeat your password."
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
      >create
        lingify account.
      </UiButton>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { colorsEnum } from '~/core/colors';
import authService, { type RegisterUserValidator } from '~/services/auth.service';
const router = useRouter()

const email = ref('')
const nickname = ref('')
const password = ref('')
const passwordConfirm = ref('')

const registerForm = ref(null)
const isValid = async () => {
  //@ts-expect-error registerForm type gives automaticcaly in vuetify
  const { valid } = await registerForm.value!.validate()
  return valid
}
const resetForm = () => {
  //@ts-expect-error registerForm type gives automaticcaly in vuetify
  registerForm.value?.reset()
}

const isLoading = ref(false)
const toastStore = useToastStore()

const onRegister = async () => {
  if (password.value !== passwordConfirm.value) {
    return
  }


  if (await isValid()) {
    const payload: RegisterUserValidator = {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    }
    try {
      isLoading.value = true
      const message = await authService.register(payload)
      isLoading.value = false
      toastStore.openSnackbar(message, 3000, colorsEnum.EMERALD)
      resetForm()
      router.push('/login')
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

const emailRules = ref([
  (v: string) => !!v || 'email is required.',
  (v: any) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return v.match(emailPattern) ? true : 'Некорректный формат почты'
  }
])

</script>

<style scoped></style>