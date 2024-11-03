import axios from "axios";
import type { Country } from "~/core/types/country";

class CountryService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getCountries(): Promise<Country[]> {
    const { data } = await axios.get<Country[]>(`${this.baseUrl}/countries`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  }
}

const countryService = new CountryService("http://localhost:4000");
export default countryService;
