<template>
  <UiButton
    @click="() => (isSubscriberRef ? unsub(communityId) : sub(communityId))"
    mode="elevated"
    :color="isSubscriberRef ? colors.BG_SLATE : colors.SEAGREEN"
    :text-color="isSubscriberRef ? colors.SEAGREEN : colors.BG_SLATE"
    :prepend-icon="isSubscriberRef ? 'mdi-account-minus' : 'mdi-account-plus'"
  >
    {{ isSubscriberRef ? "Unsubscribe" : "Subscribe" }}
  </UiButton>
</template>

<script setup lang="ts">
import { colors } from "~/core/colors";
import type { Community, Subscriber } from "~/core/types/community";
import { useToast } from "~/hooks/use-toast";
import communityService from "~/services/community.service";

const userStore = useUserStore();
const { toast } = useToast();

const sub = async (id: string) => {
  isSubscriberRef.value = true;
  const payload = {
    userId: userStore.user ? userStore.user.id : "",
    communityId: id,
  };

  try {
    await communityService.sub(payload);
    toast.success({ message: "Subscribed to community" });
  } catch (error) {
    toast.error({ message: "Could not subscribe to community" });
    isSubscriberRef.value = false;
  }
};

const unsub = async (id: string) => {
  isSubscriberRef.value = false;
  const payload = {
    userId: userStore.user ? userStore.user.id : "",
    communityId: id,
  };

  try {
    await communityService.unsub(payload);
    toast.success({ message: "Unsubscribed from community" });
  } catch (error) {
    toast.error({ message: "Could not unsubscribe from community" });
    isSubscriberRef.value = true;
  }
};

const props = defineProps<{
  communityId: string;
  isSubscriber: boolean;
}>();

const isSubscriberRef = ref(props.isSubscriber);

watch(
  () => props.isSubscriber,
  () => {
    isSubscriberRef.value = props.isSubscriber;
  },
);
</script>

<style scoped></style>
