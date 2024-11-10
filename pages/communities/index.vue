<template>
  <section class="bg-slate-50 min-h-screen">
    <CommunityCreateDialog v-model="dialog" />
    <div class="container px-6 py-10 mx-auto">
      <h1
        class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl"
      >
        Communities
      </h1>
      <p class="max-w-2xl mx-auto my-6 text-center text-gray-500">
        Here you will find many communities with which you can share your
        learning of different languages
      </p>
      <div
        class="flex flex-col items-start md:items-center gap-4 w-fit md:flex-row"
      >
        <v-text-field
          label="Поиск"
          class="w-72"
          density="compact"
          v-model="query"
          @update:model-value="search"
          style="font-size: 24px !important"
          placeholder="Напишите название сообщества"
          color="#28B0A6"
          :counter="128"
          hide-details
          @click:prepend-inner="search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          :loading="isSearchLoading"
        ></v-text-field>
        <UiButton
          prepend-icon="mdi-plus"
          mode="elevated"
          :color="colors.SEAGREEN"
          text-color="white"
          @click="openDialog"
          >Create community</UiButton
        >
      </div>
      <LoaderSpinner v-if="isLoading" />
      <template v-else>
        <div
          class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4"
        >
          <CommunityCard
            v-for="community in communities as Community[]"
            :community="community"
          />
        </div>
        <div
          v-if="!communities.length"
          class="text-gray-500 mt-5 flex flex-col items-center"
        >
          <v-icon size="200">mdi-emoticon-sad-outline</v-icon>
          <div class="text-center">No communities found.</div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { colors } from "~/core/colors";
import type { Community } from "~/core/types/community";
import { useToast } from "~/hooks/use-toast";
import communityService from "~/services/community.service";

const { toast } = useToast();
const userStore = useUserStore();

const communities = ref<Community[]>([]);
let communitiesData: Community[] = [];
const isLoading = ref(false);

const query = ref("");
const isSearchLoading = ref(false);

const search = debounce(async () => {
  try {
    if (query.value) {
      const searchResults: Community[] = await communityService.search(
        query.value,
      );
      communities.value = searchResults;
      return;
    }
    communities.value = communitiesData;
  } catch (err) {
    // on error
    toast.error({ message: "Couldn't found tour infos" });
  }
}, 300);

const fetchCommunities = async () => {
  try {
    isLoading.value = true;
    const fetchedCommunities = await communityService.getCommunities();
    communities.value = fetchedCommunities;
    communitiesData = fetchedCommunities;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    toast.error({ message: "Could not fetch communities" });
  }
};

const dialog = ref(false);

const openDialog = () => (dialog.value = true);

onMounted(async () => Promise.all([userStore.getUser(), fetchCommunities()]));
</script>

<style scoped></style>
