# Backend services

1. Auth Service
   - create `.env` inside `src/config/.env.dev` and put these contents with your acctual value.
   ```.env
    PORT=8000
    CLIENT_ID=**********.apps.googleusercontent.com
    CLIENT_SECRET=*******
    CALLBACK_URL=http://localhost:8000/api/v1/auth/google/callback
    SECRET_KEY=********
    CLIENT_REDIRECT_URL=http://127.0.0.1:5500/Frontend/AuthConsumer/index.html
   ```
