import type { User } from "./user"
import type { Image } from './image'
import type { Country } from "./country"



export type Community = {
  id: string
  name: string
  language: string
  description?: string
  ownerId: string
  avatarId: string
  bannerId: string
  countryId: string
  owner: User
  avatar: Image
  banner: Image
  country: Country
  posts: Post[]
  subscribers: Subscriber[]
  createdAt: Date
  updatedAt: Date
}

export type Subscriber = {
  userId: string
  communityId: string
  community: Community
  user: User
  createdAt: Date
  updatedAt: Date
}


export type Post = {
  id: string
  title: string
  text: string
  ownerId: string
  communityId: string
  comments: Comment[]
  image?: Image
  likes: Like[]
  community: Community
  owner: User
  createdAt: Date
  updatedAt: Date
}


export type Like = {
  id: string
  userId: string
  postId: string
  post: Post
  user: User

  createdAt: Date
  updatedAt: Date
}

export type Comment = {
  id: string
  text: string
  ownerId: string
  postId: string
  owner: User
  post: Post
  createdAt: Date
  updatedAt: Date
}