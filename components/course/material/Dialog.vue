<template>
  <v-dialog
    v-model="dialog"
    width="500px"
  >
    <v-card style="padding: 16px;">
      <v-card-title>
        {{ material ? material.name : 'Unknown' }}
      </v-card-title>
      <v-card-text>
        {{ material ? material.description : 'None' }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <UiButton
          type="submit"
          @click="dialog = false"
          mode="tonal"
          color="red"
          prepend-icon="mdi-close"
        >Закрыть</UiButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Material } from '~/core/types/course';


const dialog = defineModel<boolean>()

defineProps<{
  material: Material | null
}>()

</script>

<style scoped></style>