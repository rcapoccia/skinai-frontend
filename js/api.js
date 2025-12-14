// API Configuration
const API_BASE_URL = 'https://164-90-171-42.nip.io/api';

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
  }
  
  // Clear token
  clearToken() {
    this.token = null;
    localStorage.removeItem('skinai_token');
    localStorage.removeItem('skinai_user');
  }
  
  // Check if authenticated
  isAuthenticated() {
    return !!this.token;
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
      
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
  
  async login(email, password) {
    try {
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
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
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
      console.error('Get me error:', error);
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
      const response = await fetch(`${this.baseURL}/api/questionnaire/submit`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to submit questionnaire');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Submit questionnaire error:', error);
      throw error;
    }
  }
  
  async getQuestionnaire() {
    try {
      const response = await fetch(`${this.baseURL}/api/questionnaire/me`, {
        headers: this.getHeaders()
      });
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get questionnaire error:', error);
      return null;
    }
  }
  
  // ============================================================================
  // ANALYSIS ENDPOINTS
  // ============================================================================
  
  async analyzePhoto(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${this.baseURL}/api/sam/analyze-photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Analysis failed');
      }
      
      const result = await response.json();
      
      // Save to localStorage for report page
      localStorage.setItem('skinai_latest_analysis', JSON.stringify(result));
      
      return result;
    } catch (error) {
      console.error('Analyze photo error:', error);
      throw error;
    }
  }
  
  getLatestAnalysis() {
    const analysisStr = localStorage.getItem('skinai_latest_analysis');
    return analysisStr ? JSON.parse(analysisStr) : null;
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
      console.error('Create diary entry error:', error);
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
      console.error('Get diary entries error:', error);
      return [];
    }
  }
}

// Create global instance
const api = new SkinAIAPI();

// Auth guard for protected pages
function requireAuth() {
  if (!api.isAuthenticated()) {
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
