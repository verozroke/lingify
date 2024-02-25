import type { Image } from './image'
export type Course = {
  id: string
  name: string
  description: string
  avatarId: string
  avatar: Image
  lessons: Lesson[]
  createdAt: Date
  updatedAt: Date
}


export type Lesson = {
  id: string
  name: string
  description: string
  keyWords: string
  videoUrl?: string
  courseId: string
  course: Course
  materials: Material[]
  createdAt: Date
  updatedAt: Date
}

export type Material = {
  id: string
  name: string
  url: string
  lessonId: string
  lesson: Lesson
  createdAt: Date
  updatedAt: Date
}

export const CourseMap = {
  'russian': 'Русский'
} as const

export const LessonColorMap = {
  0: 'orange',
  1: 'lime',
  2: 'indigo',
  3: 'sky',
  4: 'purple',
  5: 'indigo',
  6: 'orange',
  7: 'lime',
  8: 'indigo',
  9: 'sky',
} as const