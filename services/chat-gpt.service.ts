import axios from "axios";
import type { Course } from "~/core/types/course";

export type AnswerVariant = {
  letter: 'A' | 'B' | 'C' | 'D',
  answer: string
}

export type Question = {
  question: string,
  correctAnswer: 'A' | 'B' | 'C' | 'D',
  selectedVariant: 'A' | 'B' | 'C' | 'D',
  variants: AnswerVariant[]
}

export type GetQuestionsPayload = {
  lessonName: string
  lessonDescription: string
  keyWords: string
  courseName: string
  userInfo: string
}

class ChatGPTService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }


  async getQuestions(body: GetQuestionsPayload): Promise<Question[]> {
    const { data } = await axios.post<string>(`${this.baseUrl}/chat-completion-api`, body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return JSON.parse(data)
  }
}



const chatGPTService = new ChatGPTService('http://localhost:4000');
export default chatGPTService