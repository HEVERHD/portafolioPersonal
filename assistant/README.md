# Asistente del portafolio («Pregúntale a mi portafolio»)

Servicio pequeño que responde preguntas sobre Hevert con **Claude Haiku 5.5**, usando solo lo que dice el portafolio. Lo usa el chat de Tinta (`src/components/Assistant.tsx`) y corre en **Google Cloud Run**.

Es **opcional**: mientras el portafolio no tenga `NEXT_PUBLIC_ASSISTANT_URL`, Tinta responde en el navegador con `src/lib/answers.ts`, que busca en los mismos datos del sitio, sin IA, sin servidor y sin costo.

- `knowledge.md`: todo lo que sabe el asistente. Se genera desde `src/content.ts` y `src/roles.ts` con `npm run assistant:knowledge` (desde la raíz del portafolio). No se edita a mano.
- `server.mjs`: `POST /chat` responde en streaming; `GET /health` dice si está en modo `live` o `demo`.
- Protecciones: límite de 20 preguntas por hora por visitante, preguntas de hasta 600 caracteres, historial de hasta 12 turnos, CORS solo para los orígenes permitidos y respuestas de máximo 700 tokens. Los logs guardan solo el consumo de tokens, nunca el texto de las conversaciones.

## En local

```bash
npm install
npm run dev
```

Sin `ANTHROPIC_API_KEY` responde en **modo demo** con un texto fijo, suficiente para trabajar la interfaz. Para respuestas reales, crea `assistant/.env.local` (ignorado por git) con `ANTHROPIC_API_KEY=...`. El portafolio apunta al servicio con `NEXT_PUBLIC_ASSISTANT_URL=http://localhost:8787` en su `.env.local`.

## Desplegar en Cloud Run

Requisitos: [gcloud CLI](https://cloud.google.com/sdk/docs/install) con sesión iniciada y un proyecto de Google Cloud con facturación.

1. **Clave de Anthropic.** Créala en console.anthropic.com y ponle un **límite de gasto mensual** en Billing → Limits.
2. **APIs del proyecto:**
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com
   ```
3. **Guardar la clave en Secret Manager** (se pega por la entrada estándar, así no queda en el historial de la terminal; termina con Enter y luego Ctrl+D, o Ctrl+Z y Enter en Windows):
   ```bash
   gcloud secrets create anthropic-api-key --replication-policy=automatic
   gcloud secrets versions add anthropic-api-key --data-file=-
   ```
4. **Permiso para leer el secreto** a la cuenta de servicio con la que corre Cloud Run (por defecto, la de Compute Engine: `NUMERO_DEL_PROYECTO-compute@developer.gserviceaccount.com`):
   ```bash
   gcloud secrets add-iam-policy-binding anthropic-api-key --member="serviceAccount:NUMERO_DEL_PROYECTO-compute@developer.gserviceaccount.com" --role="roles/secretmanager.secretAccessor"
   ```
5. **Desplegar** desde esta carpeta. `--max-instances 1` mantiene el límite por visitante en una sola instancia y acota el gasto:
   ```bash
   gcloud run deploy portfolio-assistant --source . --region us-central1 --allow-unauthenticated --max-instances 1 --memory 256Mi --set-secrets ANTHROPIC_API_KEY=anthropic-api-key:latest --set-env-vars ALLOWED_ORIGINS=https://www.hevertdavid.com
   ```
6. **Conectar el portafolio.** Copia la URL que imprime el despliegue (`https://portfolio-assistant-....run.app`) en la variable `NEXT_PUBLIC_ASSISTANT_URL` del hosting del portafolio y vuelve a publicarlo. Mientras esa variable no exista, Tinta no aparece.
7. **Alerta de presupuesto** en Google Cloud (Billing → Budgets & alerts), por ejemplo de 5 USD al mes.

Cuando cambie el contenido del portafolio: `npm run assistant:knowledge` en la raíz, commit y repetir el paso 5.
