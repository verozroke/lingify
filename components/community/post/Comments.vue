<template>
  <div class="border-t py-5 flex flex-col mt-5 w-full bg-white">
    <UiInput
      id="comment-input"
      v-model="postStore.commentInput"
      label="New comment"
      type="text"
      :loading="isLoading"
      :disabled="isLoading"
      :rules="commentInputRules"
      placeholder="Type comment..."
    />
    <div class="flex justify-end w-full">
      <UiButton
        @click="commentPost"
        :loading="isLoading"
        :disabled="isLoading"
        text-color="white"
        :color="colors.SEAGREEN"
        mode="elevated"
        prepend-icon="mdi-comment-plus"
        >Comment</UiButton
      >
    </div>
    <div class="flex flex-col">
      <CommunityPostComment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :onDeleteComment="onDeleteComment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { colors } from "~/core/colors";
import type { Comment } from "~/core/types/community";
import { useToast } from "~/hooks/use-toast";
import postService, { type CommentPayload } from "~/services/post.service";

const userStore = useUserStore();
const postStore = usePostStore();
const { toast } = useToast();
const props = defineProps<{
  comments: Comment[];
  postUsername: string;
  postId: string;
  onDeleteComments: (id: string) => void;
}>();

const isLoading = ref(false);

const commentPost = async () => {
  const payload: CommentPayload = {
    text: postStore.commentInput,
    postId: props.postId,
    userId: userStore.user!.id,
  };

  try {
    isLoading.value = true;
    const newComment = await postService.comment(payload);
    props.comments.push(newComment);
    postStore.commentInput = `@${props.postUsername}, `;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    toast.error({ message: "Could not comment to post." });
  }
};

const commentInputRules = ref([(v: string) => !!v || "comment is required."]);

const onDeleteComment = (id: string) => props.onDeleteComments(id);

onMounted(() => {
  postStore.commentInput = `@${props.postUsername}, `;
});
</script>

<style scoped></style>
