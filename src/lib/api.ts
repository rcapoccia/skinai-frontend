/**
 * SkinAI API Client
 * Integrazione con backend FastAPI su DigitalOcean (164.90.171.42)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://164.90.171.42.nip.io';

export interface UserData {
  email: string;
  name: string;
  consent_diary?: boolean;
  consent_training?: boolean;
}

export interface AnalysisMetrics {
  hydration_level: number;
  dark_circles_level: number;
  spots_count: number;
  wrinkles_level: number;
  pores_visibility: number;
  texture_uniformity: number;
  redness_level: number;
}

export interface AnalysisResult {
  id: number;
  metrics: AnalysisMetrics;
  overall_score: number;
  report: string;
  recommendations: string[];
}

export interface DiaryEntry {
  id: number;
  date: string;
  overall_score: number;
  report: string;
}

export interface DiaryResponse {
  entries: DiaryEntry[];
}

// API Client
export const api = {
  baseURL: API_BASE_URL,

  /**
   * Health check
   */
  health: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('API non disponibile');
    return response.json();
  },

  /**
   * Crea o recupera utente
   */
  createUser: async (userData: UserData): Promise<{ id: number }> => {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Errore creazione utente');
    return response.json();
  },

  /**
   * Analizza foto (endpoint principale)
   */
  analyzePhoto: async (file: File, userId: number = 1): Promise<AnalysisResult> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId.toString());

    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Errore analisi: ${error}`);
    }

    return response.json();
  },

  /**
   * Alias per compatibilità con codice esistente
   */
  analyzeImage: async (formData: FormData, token?: string): Promise<AnalysisResult> => {
    const file = formData.get('file') as File;
    if (!file) throw new Error('Nessun file fornito');
    return api.analyzePhoto(file, 1);
  },

  /**
   * Recupera diario utente
   */
  getDiary: async (userId: number | string = 1): Promise<DiaryResponse> => {
    // Se viene passato un token (string), usa userId = 1
    const id = typeof userId === 'string' ? 1 : userId;
    const response = await fetch(`${API_BASE_URL}/api/diary/${id}`);
    if (!response.ok) throw new Error('Errore recupero diario');
    return response.json();
  },

  /**
   * Registrazione utente (compatibilità)
   */
  register: async (data: { email: string; password?: string; full_name?: string; name?: string }): Promise<{ id: number }> => {
    return api.createUser({
      email: data.email,
      name: data.full_name || data.name || 'Utente',
      consent_diary: true,
      consent_training: true,
    });
  },

  /**
   * Login (mock - backend attuale non ha auth)
   */
  login: async (data: { email: string; password: string }): Promise<{ token: string; user_id: number }> => {
    // Mock login - ritorna sempre successo
    return {
      token: 'mock-token',
      user_id: 1,
    };
  },

  /**
   * Submit questionario (mock)
   */
  submitQuestionnaire: async (data: any, token?: string): Promise<{ success: boolean }> => {
    // Mock - il backend attuale non ha endpoint questionario
    console.log('Questionario salvato (mock):', data);
    return { success: true };
  },

  /**
   * Aggiungi entry diario (mock)
   */
  addDiaryEntry: async (data: any, token?: string): Promise<{ success: boolean }> => {
    // Mock - il backend attuale salva automaticamente nel diario dopo analisi
    console.log('Diario entry salvata (mock):', data);
    return { success: true };
  },
};

export default api;
