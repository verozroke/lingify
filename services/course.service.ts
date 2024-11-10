import axios from "axios";
import type { LessonInput } from "~/components/course/CreateDialog.vue";
import type { Course } from "~/core/types/course";

export type CreateCoursePayload = {
  courseLanguage: string;
  nativeLanguage: string;
  languageLevel: string;
  userId: string;
  avatarUrl: string;
};

export type CreateCourseAsTeacherPayload = {
  courseLanguage: string,
  nativeLanguage: string,
  languageLevel: string,
  avatarUrl: string,
  description: string,
  userId: string;
  lessons: LessonInput[],
}

class CourseService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCourse(courseId: string): Promise<Course> {
    const { data } = await axios.get<Course>(
      `${this.baseUrl}/courses/${courseId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  }

  async getCourses(userId: string): Promise<Course[]> {
    const { data } = await axios.get<Course[]>(
      `${this.baseUrl}/courses?user_id=${userId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  }

  async createCourse(body: CreateCoursePayload): Promise<Course> {
    const { data } = await axios.post<Course>(`${this.baseUrl}/courses`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  }

  async createCourseAsTeacher(body: CreateCourseAsTeacherPayload): Promise<Course> {
    const { data } = await axios.post<Course>(`${this.baseUrl}/courses/as-teacher`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  }
}

const courseService = new CourseService("http://localhost:4000");
export default courseService;
