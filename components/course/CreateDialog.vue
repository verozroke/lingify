<template>
  <v-dialog v-model="dialog" width="500px">
    <v-card :loading="isLoading" style="padding: 16px">
      <v-card-title>
        Create Course for {{ isTeacher ? "Teacher" : "Students" }}
      </v-card-title>
      <v-switch
        v-model="isTeacher"
        class="px-4"
        :color="colors.SEAGREEN"
        :label="isTeacher ? 'I\'m teacher' : 'I\'m student'"
      ></v-switch>
      <v-form
        v-if="isTeacher"
        @submit="createCourseAsTeacher"
        class="p-4 flex flex-col gap-2"
      >
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Course Language"
          v-model="teacherInputs.courseLanguage"
          :rules="teacherRules.courseLanguage"
          placeholder="Type course lanuage."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Native Language"
          v-model="teacherInputs.nativeLanguage"
          :rules="teacherRules.nativeLanguage"
          placeholder="Type your native lanuage."
          type="text"
        />
        <v-select
          label="Language Level"
          v-model="teacherInputs.languageLevel"
          :items="levels"
          variant="outlined"
        >
        </v-select>
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Course Description"
          v-model="teacherInputs.description"
          :rules="teacherRules.description"
          placeholder="Type course description."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Image URL"
          v-model="teacherInputs.avatarUrl"
          :rules="teacherRules.avatarUrl"
          placeholder="Type Image URL."
          type="text"
        />
        <v-btn
          :disable="isLoading"
          :loading="isLoading"
          @click="addLesson"
          mode="elevated"
          :color="colors.EMERALD"
          text-color="white"
          style="text-transform: none"
          prepend-icon="mdi-plus"
          >Add Lesson</v-btn
        >
        <template v-for="(lesson, i) in teacherInputs.lessons">
          <h1 class="py-4 font-medium text-xl">
            Lesson {{ i + 1 }} {{ lesson.name ? `(${lesson.name})` : "" }}
          </h1>
          <UiInput
            :loading="isLoading"
            :disabled="isLoading"
            :color="colors.EMERALD"
            label="Lesson Name"
            v-model="lesson.name"
            placeholder="Type lesson name."
            type="text"
          />

          <UiInput
            :loading="isLoading"
            :disabled="isLoading"
            :color="colors.EMERALD"
            label="Lesson Description"
            v-model="lesson.description"
            placeholder="Type lesson description."
            type="text"
          />
          <UiInput
            :loading="isLoading"
            :disabled="isLoading"
            :color="colors.EMERALD"
            label="Lesson Key Words"
            v-model="lesson.keyWords"
            placeholder="Type lesson key words."
            type="text"
          />
          <UiInput
            :loading="isLoading"
            :disabled="isLoading"
            :color="colors.EMERALD"
            label="Lesson Material Name"
            v-model="lesson.materialName"
            placeholder="Type material name."
            type="text"
          />
          <v-textarea
            :loading="isLoading"
            :disabled="isLoading"
            :color="colors.EMERALD"
            variant="outlined"
            label="Lesson Material Text"
            v-model="lesson.materialText"
            placeholder="Type material text."
            type="text"
          />
        </template>
      </v-form>
      <v-form
        v-if="!isTeacher"
        @submit="createCourse"
        class="p-4 flex flex-col gap-2"
      >
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Course Language"
          v-model="inputs.courseLanguage"
          :rules="rules.courseLanguage"
          placeholder="Type course lanuage."
          type="text"
        />
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Native Language"
          v-model="inputs.nativeLanguage"
          :rules="rules.nativeLanguage"
          placeholder="Type your native lanuage."
          type="text"
        />
        <v-select
          label="Language Level"
          v-model="inputs.languageLevel"
          :items="levels"
          variant="outlined"
        >
        </v-select>
        <UiInput
          :loading="isLoading"
          :disabled="isLoading"
          :color="colors.EMERALD"
          label="Image URL"
          v-model="inputs.avatarUrl"
          :rules="rules.avatarUrl"
          placeholder="Type Image URL."
          type="text"
        />
      </v-form>
      <v-card-actions class="justify-end">
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="isTeacher ? createCourseAsTeacher() : createCourse()"
          mode="elevated"
          :color="colors.EMERALD"
          text-color="white"
          prepend-icon="mdi-account-multiple-plus"
          >Create</UiButton
        >
        <UiButton
          :disable="isLoading"
          :loading="isLoading"
          type="submit"
          @click="dialog = false"
          mode="tonal"
          color="red"
          prepend-icon="mdi-close"
          >Close</UiButton
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { colors } from "~/core/colors";
import { useToast } from "~/hooks/use-toast";
import type {
  CreateCourseAsTeacherPayload,
  CreateCoursePayload,
} from "~/services/course.service";
import courseService from "~/services/course.service";

export type LessonInput = {
  name: string;
  description: string;
  keyWords: string;
  materialName: string;
  materialText: string;
};

export type TeacherInputsType = {
  courseLanguage: string;
  nativeLanguage: string;
  languageLevel: string;
  avatarUrl: string;
  description: string;
  lessons: LessonInput[];
};

const router = useRouter();
const { toast } = useToast();
const userStore = useUserStore();
const dialog = defineModel<boolean>();
const isLoading = ref(false);
const isTeacher = ref(false);
const levels = ref<string[]>(["A1", "A2", "B1", "B2", "C1", "C2"]);

const inputs = ref({
  courseLanguage: "",
  nativeLanguage: "",
  languageLevel: "",
  avatarUrl: "",
});

const teacherInputs = ref<TeacherInputsType>({
  courseLanguage: "",
  nativeLanguage: "",
  languageLevel: "",
  avatarUrl: "",
  description: "",
  lessons: [],
});

const addLesson = () => {
  teacherInputs.value.lessons.push({
    name: "",
    description: "",
    keyWords: "",
    materialName: "",
    materialText: "",
  });
};
const createCourseAsTeacher = async () => {
  if (!userStore.user) {
    return;
  }
  const {
    courseLanguage,
    nativeLanguage,
    languageLevel,
    avatarUrl,
    description,
    lessons,
  } = teacherInputs.value;

  const payload: CreateCourseAsTeacherPayload = {
    courseLanguage,
    nativeLanguage,
    languageLevel,
    userId: userStore.user.id,
    avatarUrl,
    description,
    lessons,
  };

  try {
    isLoading.value = true;
    const course = await courseService.createCourseAsTeacher(payload);
    toast.success({ message: "Course created as teacher successfully." });
    router.push(`/courses/${course.id}`);
    isLoading.value = false;
  } catch (error) {
    toast.error({ message: "Could not create course as teacher." });
    isLoading.value = false;
  }
};

const createCourse = async () => {
  if (!userStore.user) {
    return;
  }
  const { courseLanguage, nativeLanguage, languageLevel, avatarUrl } =
    inputs.value;

  const payload: CreateCoursePayload = {
    courseLanguage,
    nativeLanguage,
    languageLevel,
    userId: userStore.user.id,
    avatarUrl,
  };

  try {
    isLoading.value = true;
    const course = await courseService.createCourse(payload);
    toast.success({ message: "Course created successfully." });
    router.push(`/courses/${course.id}`);
    isLoading.value = false;
  } catch (error) {
    toast.error({ message: "Could not create course." });
    isLoading.value = false;
  }
};

const rules = ref({
  courseLanguage: [(v: string) => !!v || "Course Language is required."],
  nativeLanguage: [(v: string) => !!v || "Native language is required."],
  languageLevel: [(v: string) => !!v || "Language level is required."],
  avatarUrl: [
    (v: string) => !!v || "avatarUrl is required.",
    (v: any) => isValidUrl(v) || "Must be URL",
  ],
});

const teacherRules = ref({
  courseLanguage: [(v: string) => !!v || "Course Language is required."],
  nativeLanguage: [(v: string) => !!v || "Native language is required."],
  languageLevel: [(v: string) => !!v || "Language level is required."],
  avatarUrl: [
    (v: string) => !!v || "avatarUrl is required.",
    (v: any) => isValidUrl(v) || "Must be URL",
  ],
  description: [(v: string) => !!v || "Description is required."],
});
</script>

<style scoped></style>
