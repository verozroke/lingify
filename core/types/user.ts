import type { Country } from './country'
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
}