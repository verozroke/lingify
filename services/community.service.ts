import axios from "axios";
import type { Community } from "~/core/types/community";

export type SubPayload = {
  communityId: string
  userId: string
}

export type CreateCommunityPayload = {
  name: string
  language: string
  description?: string
  ownerId: string
  avatarUrl: string
  bannerUrl: string
  countryName: string
}

class CommunityService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getCommunities(): Promise<Community[]> {
    const { data } = await axios.get<Community[]>(`${this.baseUrl}/communities`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return data
  }

  async createCommunity(body: CreateCommunityPayload): Promise<Community> {
    const { data } = await axios.post<Community>(`${this.baseUrl}/communities`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return data
  }


  async sub(body: SubPayload) {
    const { data } = await axios.post<Community[]>(`${this.baseUrl}/communities/sub`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return data
  }
  async unsub(body: SubPayload) {
    await axios.post<Community[]>(`${this.baseUrl}/communities/unsub`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }


  async search(query: string) {
    const { data } = await axios.get<Community[]>(`${this.baseUrl}/communities/search/${query}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return data
  }
}



const communityService = new CommunityService('http://localhost:4000');
export default communityService