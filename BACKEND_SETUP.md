# Setup Backend DigitalOcean per SkinAI

Questa guida ti aiuta a configurare il backend FastAPI su DigitalOcean per funzionare con il frontend su Vercel.

---

## 1. Configurazione CORS

### Modifica il file main.py del backend

SSH nel server:
```bash
ssh root@164.90.171.42
```

Apri il file principale del backend (es: `main.py`):
```bash
nano /var/www/skinai-backend/main.py
```

Aggiungi questa configurazione **PRIMA** di definire le route:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SkinAI API")

# ============================================
# CORS - FONDAMENTALE PER VERCEL
# ============================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skinai.it",
        "https://www.skinai.it",
        "http://localhost:5173",  # Dev locale
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ============================================
# HEALTH CHECK (per test)
# ============================================
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "SkinAI Backend"}

# ... il resto del tuo codice
```

Salva (`Ctrl+X`, poi `Y`, poi `Enter`).

---

## 2. Configurazione Nginx

### Crea configurazione per api.skinai.it

```bash
sudo nano /etc/nginx/sites-available/skinai-api
```

Incolla questo contenuto:

```nginx
server {
    listen 80;
    server_name api.skinai.it;

    # Aumenta dimensione max upload (per foto)
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        
        # Header necessari per CORS
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeout per analisi AI (può richiedere tempo)
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

Salva e attiva:

```bash
sudo ln -s /etc/nginx/sites-available/skinai-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 3. Configurazione SSL (HTTPS)

Installa Certbot:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

Genera certificato SSL per api.skinai.it:
```bash
sudo certbot --nginx -d api.skinai.it
```

Segui le istruzioni:
1. Inserisci email
2. Accetta Terms of Service
3. Scegli se ricevere newsletter (opzionale)
4. Scegli "2" per redirect automatico HTTP → HTTPS

Certbot configurerà tutto automaticamente!

---

## 4. Configurazione Servizio Systemd

Se non hai già un servizio systemd per FastAPI, crealo:

```bash
sudo nano /etc/systemd/system/skinai-backend.service
```

Contenuto:

```ini
[Unit]
Description=SkinAI FastAPI Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/skinai-backend
Environment="PATH=/var/www/skinai-backend/venv/bin"
ExecStart=/var/www/skinai-backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Nota**: Modifica i path se il tuo backend è in una cartella diversa.

Attiva e avvia:

```bash
sudo systemctl daemon-reload
sudo systemctl enable skinai-backend
sudo systemctl restart skinai-backend
```

Verifica status:

```bash
sudo systemctl status skinai-backend
```

Dovrebbe mostrare "active (running)".

---

## 5. Test Backend

### Test locale (sul server)

```bash
curl http://localhost:8000/health
```

Risposta attesa:
```json
{"status":"ok","service":"SkinAI Backend"}
```

### Test pubblico (da internet)

```bash
curl https://api.skinai.it/health
```

Stessa risposta attesa.

### Test CORS

Da browser, apri console (F12) e esegui:

```javascript
fetch('https://api.skinai.it/health')
  .then(r => r.json())
  .then(console.log)
```

Dovrebbe stampare `{status: "ok", ...}` senza errori CORS.

---

## 6. Logs e Debugging

### Logs Backend

```bash
# Real-time
sudo journalctl -u skinai-backend -f

# Ultime 100 righe
sudo journalctl -u skinai-backend -n 100
```

### Logs Nginx

```bash
# Access log
sudo tail -f /var/log/nginx/access.log

# Error log
sudo tail -f /var/log/nginx/error.log
```

---

## 7. Riavvio Servizi

Dopo modifiche al codice:

```bash
# Riavvia backend
sudo systemctl restart skinai-backend

# Riavvia Nginx (se hai modificato config)
sudo systemctl reload nginx
```

---

## 8. Firewall

Assicurati che le porte siano aperte:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8000/tcp  # Solo se vuoi accesso diretto (opzionale)
sudo ufw reload
```

---

## 9. Checklist Finale

- [ ] CORS configurato in FastAPI
- [ ] Nginx configurato per api.skinai.it
- [ ] SSL attivo (https://api.skinai.it funziona)
- [ ] Servizio systemd attivo
- [ ] Health check risponde correttamente
- [ ] Logs non mostrano errori

---

## Troubleshooting

### "502 Bad Gateway"
- Backend non in esecuzione: `sudo systemctl start skinai-backend`
- Porta sbagliata in Nginx: verifica che sia `8000`

### "CORS policy error"
- Verifica `allow_origins` in FastAPI
- Riavvia backend: `sudo systemctl restart skinai-backend`

### "SSL certificate problem"
- Rigenera certificato: `sudo certbot renew --force-renewal`

### Backend si riavvia continuamente
- Controlla logs: `sudo journalctl -u skinai-backend -n 50`
- Verifica dipendenze Python installate

---

## Manutenzione

### Rinnovo SSL (automatico)

Certbot rinnova automaticamente i certificati. Verifica con:

```bash
sudo certbot renew --dry-run
```

### Backup Database

```bash
# Backup SQLite
sudo cp /var/www/skinai-backend/database.db /var/www/skinai-backend/backups/database_$(date +%Y%m%d).db
```

### Aggiornamenti

```bash
cd /var/www/skinai-backend
source venv/bin/activate
pip install --upgrade -r requirements.txt
sudo systemctl restart skinai-backend
```
