import type { CardSet } from './card-set'
import type { Subscriber } from './community'
import type { Country } from './country'
import type { Course } from './course'
import type { Image } from './image'

export type User = {
  id: string
  nickname: string
  email: string
  bio?: string
  fullName?: string
  avatar?: Image
  banner?: Image
  country: Country
  createdAt: Date
  updatedAt: Date


  cardSets: CardSet[]
  subscribers: Subscriber[]
  courses: Course[]
}