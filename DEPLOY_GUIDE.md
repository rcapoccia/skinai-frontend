# Guida Deploy SkinAI - Produzione

## Architettura
- **Frontend**: Vercel (skinai.it)
- **Backend**: DigitalOcean (api.skinai.it)
- **Database**: SQLite su DigitalOcean

---

## 1. Deploy Frontend su Vercel

### Step 1: Crea repository GitHub
```bash
cd /home/ubuntu/skinai-frontend
git init
git add .
git commit -m "Initial commit - SkinAI frontend"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/skinai-frontend.git
git push -u origin main
```

### Step 2: Deploy su Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Clicca "Add New Project"
3. Importa il repository GitHub `skinai-frontend`
4. Configura:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

5. **Environment Variables** (aggiungi in Vercel dashboard):
   ```
   VITE_API_URL=https://api.skinai.it
   ```

6. Clicca "Deploy"

### Step 3: Configura dominio personalizzato
1. In Vercel dashboard → Settings → Domains
2. Aggiungi `skinai.it` e `www.skinai.it`
3. Vercel ti darà i record DNS da configurare

---

## 2. Configurazione DNS per skinai.it

Nel pannello del tuo provider DNS (dove hai comprato skinai.it):

### Record per Frontend (Vercel)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Record per Backend (DigitalOcean)
```
Type: A
Name: api
Value: 164.90.171.42
TTL: 3600
```

**Risultato finale:**
- `skinai.it` → Frontend Vercel
- `www.skinai.it` → Frontend Vercel
- `api.skinai.it` → Backend DigitalOcean

---

## 3. Configurazione Backend DigitalOcean

### Step 1: Configura CORS nel backend FastAPI

Modifica il file `main.py` (o equivalente) del tuo backend:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurazione CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skinai.it",
        "https://www.skinai.it",
        "http://localhost:5173",  # Per sviluppo locale
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ... resto del codice
```

### Step 2: Configura Nginx per api.skinai.it

SSH nel server DigitalOcean:
```bash
ssh root@164.90.171.42
```

Crea file di configurazione Nginx:
```bash
sudo nano /etc/nginx/sites-available/skinai-api
```

Contenuto:
```nginx
server {
    listen 80;
    server_name api.skinai.it;

    location / {
        proxy_pass http://localhost:8000;  # Porta dove gira FastAPI
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Attiva configurazione:
```bash
sudo ln -s /etc/nginx/sites-available/skinai-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: Configura SSL con Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.skinai.it
```

Certbot configurerà automaticamente HTTPS.

### Step 4: Verifica backend
```bash
curl https://api.skinai.it/health
```

Dovrebbe rispondere con status 200.

---

## 4. Test Integrazione

### Test locale (prima del deploy)
1. Crea file `.env.local`:
   ```
   VITE_API_URL=http://164.90.171.42:8000
   ```

2. Avvia dev server:
   ```bash
   pnpm dev
   ```

3. Testa login, questionario, upload foto

### Test produzione
1. Vai su `https://skinai.it`
2. Testa tutte le funzionalità
3. Controlla console browser per errori CORS

---

## 5. Monitoraggio e Manutenzione

### Vercel
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Logs: Real-time in dashboard
- Analytics: Vercel fornisce analytics gratis

### DigitalOcean
- Logs backend:
  ```bash
  sudo journalctl -u skinai-backend -f
  ```
- Logs Nginx:
  ```bash
  sudo tail -f /var/log/nginx/access.log
  sudo tail -f /var/log/nginx/error.log
  ```

---

## 6. Aggiornamenti Futuri

### Frontend
1. Fai modifiche al codice
2. Commit e push su GitHub:
   ```bash
   git add .
   git commit -m "Descrizione modifiche"
   git push
   ```
3. Vercel fa deploy automatico in 2 minuti

### Backend
1. SSH nel server
2. Aggiorna codice
3. Riavvia servizio:
   ```bash
   sudo systemctl restart skinai-backend
   ```

---

## Troubleshooting

### Errore CORS
- Verifica che `api.skinai.it` sia in `allow_origins` nel backend
- Controlla che Nginx passi correttamente gli header

### Frontend non si carica
- Verifica DNS con `nslookup skinai.it`
- Controlla deployment su Vercel dashboard

### API non risponde
- Verifica che FastAPI sia in esecuzione: `sudo systemctl status skinai-backend`
- Controlla logs Nginx
- Testa direttamente: `curl https://api.skinai.it/health`

---

## Costi Mensili Stimati

- **Vercel**: €0 (piano gratuito fino a 100GB bandwidth)
- **DigitalOcean**: €12-24 (droplet attuale)
- **Dominio skinai.it**: ~€10/anno

**Totale**: ~€12-24/mese

---

## Contatti Support

- Vercel: support@vercel.com
- DigitalOcean: cloud.digitalocean.com/support
