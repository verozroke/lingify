<template>
  <v-dialog
    v-model="dialog"
    width="500px"
  >
    <v-card
      :loading="isLoading"
      style="padding: 16px;"
    >
      <v-card-title>
        Create community
      </v-card-title>
      <v-form
        @submit="createCommunity"
        class="p-4 flex flex-col gap-2"
      >
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='name'
          v-model="inputs.name"
          :rules="rules.name"
          placeholder="enter name."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='language'
          v-model="inputs.language"
          :rules="rules.language"
          placeholder="enter language."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='description'
          v-model="inputs.description"
          :rules="rules.description"
          placeholder="enter description."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='avatar URL'
          v-model="inputs.avatarUrl"
          :rules="rules.avatarUrl"
          placeholder="enter avatar URL."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label='banner URL'
          v-model="inputs.bannerUrl"
          :rules="rules.bannerUrl"
          placeholder="enter banner URL."
          type="text"
        />
        <v-select
          label="сountry"
          v-model="inputs.country"
          :items="countries"
          variant="outlined"
        >
        </v-select>
      </v-form>
      <v-card-actions class="justify-end">
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="createCommunity"
          mode="elevated"
          :color="colors.EMERALD"
          text-color="white"
          prepend-icon="mdi-account-multiple-plus"
        >Create</UiButton>
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
import type { Country } from '~/core/types/country';
import { useToast } from '~/hooks/use-toast';
import communityService, { type CreateCommunityPayload } from '~/services/community.service';
import countryService from '~/services/country.service';

const router = useRouter()
const { toast } = useToast()
const userStore = useUserStore()
const dialog = defineModel<boolean>()
const isLoading = ref(false)

const countries = ref<string[]>([])

const fetchCountries = async () => {
  try {
    const fetchedContries: Country[] = await countryService.getCountries()
    countries.value = fetchedContries.map(country => country.name)
  } catch (error) {
    toast.success({ message: 'Could not fetch countries.' })
  }
}

watch(dialog, async () => dialog ? await fetchCountries() : null)

const inputs = ref({
  name: '',
  language: '',
  description: '',
  avatarUrl: '',
  bannerUrl: '',
  country: 'Kazakhstan',
})

const createCommunity = async () => {
  if (!userStore.user) {
    return
  }
  const { name, language, description, country, bannerUrl, avatarUrl } = inputs.value
  console.log(country)

  const payload: CreateCommunityPayload = {
    name,
    language,
    description,
    countryName: country,
    bannerUrl,
    avatarUrl,
    ownerId: userStore.user.id
  }

  try {
    isLoading.value = true

    const { id } = await communityService.createCommunity(payload)

    toast.success({ message: 'Community created successfully.' })
    router.push(`/c/${id}`)
    isLoading.value = false
  } catch (error) {
    toast.success({ message: 'Could not create community.' })
    isLoading.value = false
  }
}


const rules = ref({
  name: [
    (v: string) => !!v || 'name is required.'
  ],
  language: [
    (v: string) => !!v || 'language is required.'
  ],
  description: [
    (v: string) => !!v || 'description is required.'
  ],
  avatarUrl: [
    (v: string) => !!v || 'avatarUrl is required.',
    (v: any) => isValidUrl(v) || 'Must be URL',
  ],
  bannerUrl: [
    (v: string) => !!v || 'bannerUrl is required.',
    (v: any) => isValidUrl(v) || 'Must be URL',
  ],
})



</script>

<style scoped></style>