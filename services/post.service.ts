import axios from "axios";
import type { Like, Post, Comment } from "~/core/types/community";
import type { MessageResponse } from "~/core/types/response";


export type CreatePostPayload = {
  title: string
  text: string
  ownerId: string
  imageUrl?: string
  communityId: string
}

export type LikePayload = {
  userId: string
  postId: string
}

export type LikeResponse = {
  message: 'Unlike' | 'Like'
  like: Like | { count: number }
}

export type CommentPayload = {
  text: string
  userId: string
  postId: string
}


class PostService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }



  async createPost(body: CreatePostPayload): Promise<Post> {
    const { data } = await axios.post<Post>(`${this.baseUrl}/posts`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  async like(body: LikePayload): Promise<LikeResponse> {
    const { data } = await axios.post<LikeResponse>(`${this.baseUrl}/posts/like`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  async comment(body: CommentPayload): Promise<Comment> {
    const { data } = await axios.post<Comment>(`${this.baseUrl}/posts/comment`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }


  async deleteComment(id: string): Promise<MessageResponse> {
    const { data } = await axios.delete<MessageResponse>(`${this.baseUrl}/comments/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }

}



const postService = new PostService('http://localhost:4000');
export default postService