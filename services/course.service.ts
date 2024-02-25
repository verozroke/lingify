import axios from "axios";
import type { Course } from "~/core/types/course";


class CourseService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }


  async getCourse(courseName: string): Promise<Course> {
    const { data } = await axios.get<Course>(`${this.baseUrl}/courses/name/${courseName}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return data
  }
}



const courseService = new CourseService('http://localhost:4000');
export default courseService