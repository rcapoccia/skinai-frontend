// API Configuration
const API_BASE_URL = 'https://164.90.171.42.nip.io';

// API Helper Class
class SkinAIAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('skinai_token');
  }
  
  // Get auth headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }
  
  // Save token
  saveToken(token) {
    this.token = token;
    localStorage.setItem('skinai_token', token);
    console.log('[SkinAI] Token saved successfully');
  }
  
  // Clear token
  clearToken() {
    this.token = null;
    localStorage.removeItem('skinai_token');
    localStorage.removeItem('skinai_user');
    console.log('[SkinAI] Token cleared');
  }
  
  // Check if authenticated
  isAuthenticated() {
    const hasToken = !!this.token;
    console.log('[SkinAI] isAuthenticated:', hasToken);
    return hasToken;
  }
  
  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('skinai_user');
    return userStr ? JSON.parse(userStr) : null;
  }
  
  // Save user to localStorage
  saveUser(user) {
    localStorage.setItem('skinai_user', JSON.stringify(user));
  }
  
  // ============================================================================
  // AUTH ENDPOINTS
  // ============================================================================
  
  async register(email, password, name) {
    try {
      console.log('[SkinAI] Registering user:', email);
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify({ email, password, full_name: name })
      });
      
      if (!response.ok) {
        const error = await response.json();
        // Handle validation errors
        if (Array.isArray(error.detail)) {
          const messages = error.detail.map(e => e.msg).join(', ');
          throw new Error(messages);
        }
        throw new Error(error.detail || 'Registration failed');
      }
      
      const data = await response.json();
      this.saveToken(data.token.access_token);
      this.saveUser(data.user);
      
      console.log('[SkinAI] Registration successful');
      return data;
    } catch (error) {
      console.error('[SkinAI] Register error:', error);
      throw error;
    }
  }
  
  async login(email, password) {
    try {
      console.log('[SkinAI] Logging in user:', email);
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        if (Array.isArray(error.detail)) {
          const messages = error.detail.map(e => e.msg).join(', ');
          throw new Error(messages);
        }
        throw new Error(error.detail || 'Login failed');
      }
      
      const data = await response.json();
      this.saveToken(data.token.access_token);
      this.saveUser(data.user);
      
      console.log('[SkinAI] Login successful');
      return data;
    } catch (error) {
      console.error('[SkinAI] Login error:', error);
      throw error;
    }
  }
  
  async getMe() {
    try {
      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to get user info');
      }
      
      const user = await response.json();
      this.saveUser(user);
      
      return user;
    } catch (error) {
      console.error('[SkinAI] Get me error:', error);
      this.clearToken();
      throw error;
    }
  }
  
  logout() {
    this.clearToken();
    window.location.href = '/auth.html';
  }
  
  // ============================================================================
  // QUESTIONNAIRE ENDPOINTS
  // ============================================================================
  
  async submitQuestionnaire(data) {
    try {
      console.log('[SkinAI] Submitting questionnaire...');
      console.log('[SkinAI] Token present:', !!this.token);
      console.log('[SkinAI] Data:', JSON.stringify(data));
      
      if (!this.token) {
        throw new Error('Non sei autenticato. Effettua il login e riprova.');
      }
      
      const response = await fetch(`${this.baseURL}/questionnaire`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      console.log('[SkinAI] Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[SkinAI] Error response:', errorText);
        
        try {
          const error = JSON.parse(errorText);
          if (error.detail === 'Unauthorized') {
            this.clearToken();
            throw new Error('Sessione scaduta. Effettua nuovamente il login.');
          }
          throw new Error(error.detail || 'Errore nel salvataggio del questionario');
        } catch (parseError) {
          throw new Error('Errore di connessione al server. Riprova.');
        }
      }
      
      const result = await response.json();
      console.log('[SkinAI] Questionnaire saved successfully:', result);
      return result;
    } catch (error) {
      console.error('[SkinAI] Submit questionnaire error:', error);
      throw error;
    }
  }
  
  async getQuestionnaire() {
    try {
      const response = await fetch(`${this.baseURL}/questionnaire/me`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('[SkinAI] Get questionnaire error:', error);
      return null;
    }
  }
  
  async getLastQuestionnaire() {
    try {
      console.log('[SkinAI] Getting last questionnaire...');
      const response = await fetch(`${this.baseURL}/questionnaire/last`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        console.log('[SkinAI] No previous questionnaire found');
        return null;
      }
      
      const data = await response.json();
      console.log('[SkinAI] Last questionnaire:', data);
      return data;
    } catch (error) {
      console.error('[SkinAI] Get last questionnaire error:', error);
      return null;
    }
  }
  
  async askAssistant(question, context) {
    try {
      const response = await fetch(`${this.baseURL}/assistant`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ question, context })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get assistant response');
      }
      
      return await response.json();
    } catch (error) {
      console.error('[SkinAI] Ask assistant error:', error);
      throw error;
    }
  }
  
  // ============================================================================
  // ANALYSIS ENDPOINTS
  // ============================================================================
  
  async analyzePhoto(file) {
    try {
      console.log('[SkinAI] Analyzing photo...');
      console.log('[SkinAI] Token present:', !!this.token);
      
      if (!this.token) {
        throw new Error('Non sei autenticato. Effettua il login e riprova.');
      }
      
      const formData = new FormData();
      // Il backend richiede un array di foto con campo 'photos'
      formData.append('photos', file);
      
      const response = await fetch(`${this.baseURL}/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        body: formData
      });
      
      console.log('[SkinAI] Analyze response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[SkinAI] Analyze error response:', errorText);
        try {
          const error = JSON.parse(errorText);
          if (error.detail === 'Unauthorized' || error.detail === 'Not authenticated') {
            this.clearToken();
            throw new Error('Sessione scaduta. Effettua nuovamente il login.');
          }
          throw new Error(error.detail || 'Errore durante l\'analisi');
        } catch (parseError) {
          if (parseError.message.includes('Sessione') || parseError.message.includes('autenticato')) {
            throw parseError;
          }
          throw new Error('Errore di connessione al server. Riprova.');
        }
      }
      
      const result = await response.json();
      console.log('[SkinAI] Analysis complete');
      
      // Save to localStorage for report page
      localStorage.setItem('skinai_latest_analysis', JSON.stringify(result));
      
      return result;
    } catch (error) {
      console.error('[SkinAI] Analyze photo error:', error);
      throw error;
    }
  }
  
  getLatestAnalysis() {
    const analysisStr = localStorage.getItem('skinai_latest_analysis');
    return analysisStr ? JSON.parse(analysisStr) : null;
  }
  
  async getAnalyses() {
    try {
      const response = await fetch(`${this.baseURL}/analyses`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('[SkinAI] Get analyses error:', error);
      return [];
    }
  }
  
  async getAnalysis(id) {
    try {
      const response = await fetch(`${this.baseURL}/analyses/${id}`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('[SkinAI] Get analysis error:', error);
      return null;
    }
  }
  
  // ============================================================================
  // DIARY ENDPOINTS
  // ============================================================================
  
  async createDiaryEntry(mood, note) {
    try {
      const response = await fetch(`${this.baseURL}/diary`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ mood, note })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create diary entry');
      }
      
      return await response.json();
    } catch (error) {
      console.error('[SkinAI] Create diary entry error:', error);
      throw error;
    }
  }
  
  async getDiaryEntries() {
    try {
      const response = await fetch(`${this.baseURL}/diary/me`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('[SkinAI] Get diary entries error:', error);
      return [];
    }
  }
}

// Create global instance
const api = new SkinAIAPI();

// Auth guard for protected pages
function requireAuth() {
  if (!api.isAuthenticated()) {
    console.log('[SkinAI] Auth required, redirecting to login...');
    window.location.href = '/auth.html';
    return false;
  }
  return true;
}

// Redirect if already authenticated (for auth page)
function redirectIfAuthenticated() {
  if (api.isAuthenticated()) {
    window.location.href = '/dashboard.html';
    return true;
  }
  return false;
}
