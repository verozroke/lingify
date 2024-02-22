import { defineStore } from 'pinia'
import { useToast } from '~/hooks/use-toast'
import userService from '~/services/user.service'

export type ChangeAvatarValidator = {
  avatarUrl: string
}

export type ChangeNameValidator = {
  nickname: string
}

export type ChangeEmailValidator = {
  email: string
}

export type ChangePasswordValidator = {
  oldPassword: string
  newPassword: string
}

export const useSettingStore = defineStore('SettingStore', () => {
  const userStore = useUserStore()
  const { toast } = useToast()
  const tab = ref<string>('')
  const imageUrlInput = ref<string>('')
  const nameInput = ref<string>('')
  const emailInput = ref<string>('')
  const oldPasswordInput = ref<string>('')
  const newPasswordInput = ref<string>('')
  const newPasswordRepeatInput = ref<string>('')
  const darkMode = ref<boolean>(false)

  const saveImage = async () => {
    if (!userStore.user) {
      return
    }
    try {
      const payload: ChangeAvatarValidator = {
        avatarUrl: imageUrlInput.value
      }

      const message = await userService.changeAvatar(userStore.user.id, payload)
      // on success
      userStore.user.avatar!.url = imageUrlInput.value
      toast.success({ message })
    } catch (error) {
      // on error
      toast.error({ message: 'Could not change your avatar' })
    }
  }

  const saveUsername = async () => {
    if (!userStore.user) {
      return
    }
    try {
      const payload: ChangeNameValidator = {
        nickname: nameInput.value
      }

      const message = await userService.changeName(userStore.user.id, payload)
      // on success
      userStore.user.nickname = nameInput.value
      toast.success({ message })
    } catch (error) {
      // on error
      toast.error({ message: 'Could not change your username' })
    }
  }

  const saveEmail = async () => {
    if (!userStore.user) {
      return
    }
    try {
      const payload: ChangeEmailValidator = {
        email: emailInput.value
      }

      const message = await userService.changeEmail(userStore.user.id, payload)
      // on success
      userStore.user.email = emailInput.value
      toast.success({ message })
    } catch (error) {
      // on error
      toast.error({ message: 'Could not change your email' })
    }
  }


  const savePassword = async () => {
    if (!userStore.user) {
      return
    }
    try {
      if (newPasswordRepeatInput.value !== newPasswordInput.value) {
        toast.error({ message: 'Passwords doesn\'t match' })
        return
      }
      const payload: ChangePasswordValidator = {
        oldPassword: oldPasswordInput.value,
        newPassword: newPasswordInput.value
      }
      const message = await userService.changePassword(userStore.user.id, payload)
      // on success
      toast.success({ message })
    } catch (error) {
      // on error
      toast.error({ message: 'Could not change your password' })
    }
  }

  const setBasicValues = () => {
    if (!userStore.user) {
      return
    }
    imageUrlInput.value = userStore.user.avatar ? userStore.user.avatar.url : ''
    nameInput.value = userStore.user.nickname
    emailInput.value = userStore.user.email
  }

  return {
    tab,
    imageUrlInput,
    saveImage,
    nameInput,
    emailInput,
    setBasicValues,
    saveUsername,
    saveEmail,
    savePassword,
    oldPasswordInput,
    newPasswordInput,
    newPasswordRepeatInput,
    darkMode
  }
})