# 🚀 Checklist Deploy SkinAI - Produzione

Segui questi step nell'ordine per andare online senza problemi.

---

## ✅ FASE 1: Preparazione Backend (30 min)

### 1.1 Configurazione CORS
- [ ] SSH in DigitalOcean: `ssh root@164.90.171.42`
- [ ] Apri `main.py` del backend
- [ ] Aggiungi configurazione CORS (vedi `BACKEND_SETUP.md`)
- [ ] Aggiungi endpoint `/health`
- [ ] Riavvia backend: `sudo systemctl restart skinai-backend`

### 1.2 Configurazione Nginx
- [ ] Crea file `/etc/nginx/sites-available/skinai-api`
- [ ] Copia configurazione da `BACKEND_SETUP.md`
- [ ] Attiva: `sudo ln -s /etc/nginx/sites-available/skinai-api /etc/nginx/sites-enabled/`
- [ ] Test: `sudo nginx -t`
- [ ] Reload: `sudo systemctl reload nginx`

### 1.3 SSL per api.skinai.it
- [ ] Installa certbot: `sudo apt install certbot python3-certbot-nginx -y`
- [ ] Genera certificato: `sudo certbot --nginx -d api.skinai.it`
- [ ] Verifica HTTPS: `curl https://api.skinai.it/health`

**Test**: Apri browser → `https://api.skinai.it/health` → Deve rispondere `{"status":"ok"}`

---

## ✅ FASE 2: Deploy Frontend su Vercel (15 min)

### 2.1 Crea Repository GitHub
- [ ] Vai su [github.com/new](https://github.com/new)
- [ ] Nome repository: `skinai-frontend`
- [ ] Crea repository
- [ ] Copia comandi Git mostrati

### 2.2 Push Codice
Dalla cartella `skinai-frontend`:
```bash
git init
git add .
git commit -m "Initial commit - SkinAI frontend"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/skinai-frontend.git
git push -u origin main
```

- [ ] Codice pushato su GitHub

### 2.3 Deploy su Vercel
- [ ] Vai su [vercel.com](https://vercel.com)
- [ ] Clicca "Add New Project"
- [ ] Importa repository `skinai-frontend`
- [ ] Configurazione:
  - Framework: **Vite**
  - Build Command: `pnpm build`
  - Output Directory: `dist`
  - Install Command: `pnpm install`
- [ ] Environment Variables → Aggiungi:
  ```
  VITE_API_URL = https://api.skinai.it
  ```
- [ ] Clicca "Deploy"
- [ ] Aspetta 2-3 minuti

**Test**: Apri URL Vercel (es: `skinai-frontend.vercel.app`) → Deve caricare la home

---

## ✅ FASE 3: Configurazione DNS (10 min + 30 min propagazione)

### 3.1 Accedi al Provider DNS
- [ ] Vai al pannello dove hai comprato `skinai.it`
- [ ] Trova sezione "DNS Management"

### 3.2 Aggiungi Record DNS
Vedi dettagli in `DNS_CONFIG.md`

**Record 1 - Frontend root:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Record 2 - Frontend www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Record 3 - Backend API:**
```
Type: A
Name: api
Value: 164.90.171.42
TTL: 3600
```

- [ ] Tutti e 3 i record aggiunti
- [ ] Salvato configurazione DNS

### 3.3 Configura Dominio in Vercel
- [ ] Vercel Dashboard → Settings → Domains
- [ ] Aggiungi `skinai.it`
- [ ] Aggiungi `www.skinai.it`
- [ ] Vercel verificherà automaticamente i record DNS

**Aspetta 10-30 minuti per propagazione DNS**

---

## ✅ FASE 4: Test Finale (10 min)

### 4.1 Test DNS
```bash
nslookup skinai.it
# Deve rispondere: 76.76.21.21

nslookup api.skinai.it
# Deve rispondere: 164.90.171.42
```

- [ ] DNS propagato correttamente

### 4.2 Test Frontend
- [ ] Apri `https://skinai.it`
- [ ] Home page si carica
- [ ] Immagini visibili
- [ ] Nessun errore in console (F12)

### 4.3 Test Integrazione Frontend-Backend
- [ ] Clicca "Inizia il test della pelle"
- [ ] Compila form login/registrazione
- [ ] Verifica che la chiamata API funzioni
- [ ] Controlla console browser: **NO errori CORS**

### 4.4 Test Funzionalità Complete
- [ ] Login funziona
- [ ] Dashboard si carica
- [ ] Questionario si salva
- [ ] Upload foto funziona
- [ ] Analisi AI viene generata
- [ ] Report si visualizza
- [ ] Diario funziona

---

## ✅ FASE 5: Monitoraggio (continuo)

### 5.1 Setup Monitoraggio
- [ ] Vercel Dashboard → Analytics → Attivato
- [ ] Aggiungi alert email in Vercel per errori

### 5.2 Backup
- [ ] Backup database: `sudo cp /var/www/skinai-backend/database.db /var/www/backups/`
- [ ] Configura backup automatico settimanale

### 5.3 Logs
Salva questi comandi per debug futuro:

```bash
# Logs backend
sudo journalctl -u skinai-backend -f

# Logs Nginx
sudo tail -f /var/log/nginx/error.log

# Vercel logs
# Vai su vercel.com/dashboard → Deployments → Logs
```

---

## 🎉 COMPLETATO!

Se tutti i checkbox sono spuntati, **SkinAI è LIVE**!

🌐 **Frontend**: https://skinai.it  
🔌 **API**: https://api.skinai.it  
📊 **Dashboard Vercel**: https://vercel.com/dashboard  

---

## 📞 Supporto

**Problemi DNS**: Contatta provider dominio  
**Problemi Vercel**: support@vercel.com  
**Problemi Backend**: Controlla logs con comandi sopra  

---

## 🔄 Aggiornamenti Futuri

### Frontend
```bash
# Modifica codice
git add .
git commit -m "Descrizione modifiche"
git push
# Vercel fa deploy automatico in 2 min
```

### Backend
```bash
ssh root@164.90.171.42
cd /var/www/skinai-backend
# Modifica codice
sudo systemctl restart skinai-backend
```

---

## 📊 Metriche di Successo

- [ ] Uptime > 99%
- [ ] Tempo caricamento < 2 secondi
- [ ] Zero errori CORS
- [ ] Analisi AI funziona sempre
- [ ] SSL attivo su tutti i domini
