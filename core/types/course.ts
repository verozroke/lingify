import type { User } from "./user"
import type { Image } from './image'
export type Course = {
  id: string
  name: string
  description: string
  avatarId: string
  userId: string

  avatar: Image
  user: User
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