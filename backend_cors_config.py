"""
Configurazione CORS per Backend FastAPI
Copia questo codice nel tuo file main.py del backend su DigitalOcean
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SkinAI API")

# ============================================
# CONFIGURAZIONE CORS - IMPORTANTE!
# ============================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skinai.it",
        "https://www.skinai.it",
        "http://localhost:5173",  # Per sviluppo locale
        "http://localhost:3000",  # Alternativa porta dev
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ============================================
# HEALTH CHECK ENDPOINT
# ============================================
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "SkinAI Backend",
        "version": "1.0.0"
    }

# ============================================
# IL TUO CODICE ESISTENTE QUI
# ============================================
# ... auth routes
# ... questionario routes
# ... upload routes
# ... analisi routes
# ... diario routes
