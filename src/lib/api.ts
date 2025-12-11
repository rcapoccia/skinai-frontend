// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.skinai.it';

// API Client
class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, nome?: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, nome }),
    });
  }

  // Questionario endpoints
  async submitQuestionario(data: any) {
    return this.request('/questionario', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getQuestionario(userId: string) {
    return this.request(`/questionario/${userId}`);
  }

  // Upload foto endpoints
  async uploadFoto(formData: FormData) {
    return fetch(`${this.baseURL}/upload`, {
      method: 'POST',
      body: formData, // FormData handles its own Content-Type
    }).then(res => res.json());
  }

  // Analisi endpoints
  async getAnalisi(userId: string) {
    return this.request(`/analisi/${userId}`);
  }

  async createAnalisi(userId: string, fotoIds: string[]) {
    return this.request('/analisi', {
      method: 'POST',
      body: JSON.stringify({ userId, fotoIds }),
    });
  }

  // Diario endpoints
  async getDiario(userId: string) {
    return this.request(`/diario/${userId}`);
  }

  async addDiarioEntry(userId: string, nota: string, mood: string) {
    return this.request('/diario', {
      method: 'POST',
      body: JSON.stringify({ userId, nota, mood }),
    });
  }
}

export const api = new APIClient(API_BASE_URL);
