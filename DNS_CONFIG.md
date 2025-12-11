# Configurazione DNS per skinai.it

## Panoramica

Devi configurare 3 record DNS per far funzionare tutto:

1. **skinai.it** → Frontend Vercel
2. **www.skinai.it** → Frontend Vercel  
3. **api.skinai.it** → Backend DigitalOcean

---

## Dove Configurare

Vai nel pannello di controllo del provider dove hai comprato **skinai.it** (es: GoDaddy, Namecheap, Aruba, etc.)

Cerca la sezione **DNS Management** o **Gestione DNS**.

---

## Record DNS da Aggiungere

### 1. Record A per skinai.it (root domain)

```
Type: A
Name: @ (oppure lascia vuoto)
Value: 76.76.21.21
TTL: 3600 (o Auto)
```

**Nota**: `76.76.21.21` è l'IP di Vercel. Potrebbe cambiare, verifica nella dashboard Vercel.

---

### 2. Record CNAME per www.skinai.it

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (o Auto)
```

---

### 3. Record A per api.skinai.it (backend)

```
Type: A
Name: api
Value: 164.90.171.42
TTL: 3600 (o Auto)
```

**Nota**: `164.90.171.42` è l'IP del tuo server DigitalOcean.

---

## Verifica Configurazione

Dopo aver salvato i record DNS, aspetta **10-30 minuti** per la propagazione.

### Test da terminale:

```bash
# Verifica frontend
nslookup skinai.it
# Dovrebbe rispondere con 76.76.21.21

nslookup www.skinai.it
# Dovrebbe rispondere con cname.vercel-dns.com

# Verifica backend
nslookup api.skinai.it
# Dovrebbe rispondere con 164.90.171.42
```

### Test da browser:

```
https://skinai.it → Dovrebbe caricare il frontend
https://www.skinai.it → Dovrebbe caricare il frontend
https://api.skinai.it/health → Dovrebbe rispondere {"status":"ok"}
```

---

## Troubleshooting

### "DNS_PROBE_FINISHED_NXDOMAIN"
- I record DNS non sono ancora propagati
- Aspetta altri 10-20 minuti
- Verifica di aver salvato correttamente i record

### "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"
- SSL non ancora configurato
- Per Vercel: si configura automaticamente
- Per api.skinai.it: esegui `sudo certbot --nginx -d api.skinai.it` sul server

### Frontend carica ma API non funziona
- Verifica che `api.skinai.it` punti a `164.90.171.42`
- Verifica che Nginx sia configurato correttamente sul server
- Controlla CORS nel backend FastAPI

---

## Esempio Configurazione (GoDaddy)

Se usi GoDaddy, la schermata sarà così:

| Type  | Name | Value                  | TTL  |
|-------|------|------------------------|------|
| A     | @    | 76.76.21.21           | 600  |
| CNAME | www  | cname.vercel-dns.com  | 3600 |
| A     | api  | 164.90.171.42         | 3600 |

---

## Esempio Configurazione (Cloudflare)

Se usi Cloudflare:

1. **Disattiva il proxy arancione** per `api.skinai.it` (clicca sulla nuvola arancione per farla diventare grigia)
2. Aggiungi i record come sopra

**Importante**: Il proxy Cloudflare può interferire con le chiamate API, meglio tenerlo disattivato per `api.skinai.it`.

---

## Timeline Completa

1. **Ora 0**: Configuri DNS
2. **Ora 0-30 min**: Propagazione DNS
3. **Ora 30 min**: Vercel configura SSL automaticamente
4. **Ora 35 min**: Tutto funzionante!

---

## Contatti

Se hai problemi con la configurazione DNS, contatta il supporto del tuo provider di dominio.
