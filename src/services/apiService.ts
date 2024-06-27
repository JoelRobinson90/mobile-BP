import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants?.expoConfig?.extra?.API_URL;
const version = Constants?.expoConfig?.extra?.VERSION;

interface Options extends AxiosRequestConfig {
  method: string;
  url: string;
  headers: AxiosHeaders;
  config?: AxiosRequestConfig;
  data?: any;
}

class ApiService {
  private apiUrl: string;
  private headers: AxiosHeaders;

  constructor() {
    this.apiUrl = `${apiUrl}/${version}`;
    this.headers = new AxiosHeaders();
    this.headers.set('Content-Type', 'application/json');
  }

  async get(path: string, queryParams?: string) {
    let url = `${this.apiUrl}/${path}`;

    if (queryParams) {
      const queryString = JSON.stringify(queryParams);
      url += `?${queryString}`;
    }

    const options = {
      method: 'get',
      url,
      headers: this.headers,
    };

    return await this.axiosQuery(options);
  }

  async post(path: string, body?: any, method = 'post') {
    const url = `${this.apiUrl}/${path}`;
    const options: Options = {
      method,
      url,
      headers: this.headers,
    };

    if (body) options.data = body;

    return await this.axiosQuery(options);
  }

  async delete(path: string, body?: any) {
    const url = `${this.apiUrl}/${path}`;
    const options: Options = {
      method: 'delete',
      url,
      headers: this.headers,
    };

    if (body) options.data = body;

    return await this.axiosQuery(options);
  }

  private async axiosQuery(options: Options) {
    try {
      const response = await axios(options);
      return response;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error('different error than axios');
      }
    }
  }
}

const server = new ApiService();

export default server;
