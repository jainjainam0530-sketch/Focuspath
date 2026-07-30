# FocusPath

> Guiding Every Student Toward Their Future.

An AI-powered student mentor built by Jainam, a 16-year-old founder from India. FocusPath helps students discover their strengths, choose meaningful careers, stay focused, and build a better future — with **FOCUS**, an AI mentor that lives right in the browser.

**Live:** https://nextgen-guide.emergent.host

---

## Features

- 🎬 Cinematic boot-up sequence
- 🤖 FOCUS AI mentor (real LLM chat, voice input, voice output)
- 🌌 Interactive career galaxy
- ⭐ Live student review wall with FOCUS AI auto-replies
- 📱 Interactive 3D drag-to-rotate phone mockup
- 🐛 Student problem center + feedback system
- 📥 APK download with live download counter
- 👤 Founder story with animated timeline
- 🌐 Community section (Instagram, LinkedIn, Discord, GitHub)
- 📄 Legal pages (Privacy Policy, Terms of Service)
- 📬 Contact form → founder inbox
- 🎨 Full glassmorphism + neon aesthetic

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 18, Tailwind CSS, shadcn/ui, Framer Motion, Lucide icons
- **Backend:** Next.js API Routes (catch-all handler)
- **Database:** MongoDB
- **AI:** OpenAI GPT-4o-mini via Emergent integrations proxy
- **Notifications:** Sonner
- **Hosting:** Emergent platform

---

## Getting Started

### 1. Install dependencies
```bash
yarn install
```

### 2. Configure environment
Copy `.env.example` to `.env` and fill in real values:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=focuspath
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CORS_ORIGINS=*
EMERGENT_LLM_KEY=sk-emergent-...
```

### 3. Run dev server
```bash
yarn dev
```

Visit `http://localhost:3000`.

---

## Project Structure

```
/app
├── app/
│   ├── api/[[...path]]/route.js   # All backend endpoints
│   ├── page.js                    # Main cinematic homepage
│   ├── layout.js                  # Root layout + fonts + toaster
│   ├── globals.css                # Design system + futuristic effects
│   ├── privacy/page.js            # Privacy Policy
│   └── terms/page.js              # Terms of Service
├── components/
│   ├── legal-shell.jsx            # Shared layout for legal pages
│   └── ui/                        # shadcn/ui components
├── lib/                           # utilities
├── hooks/                         # React hooks
└── public/                        # static assets
```

---

## API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/focus/chat` | Chat with FOCUS AI mentor |
| POST | `/api/reviews` | Submit a review (auto-gets FOCUS reply) |
| GET | `/api/reviews` | List latest reviews + avg rating |
| POST | `/api/problems` | Submit student problem/struggle |
| POST | `/api/feedback` | Submit feedback / feature idea / bug |
| POST | `/api/contact` | Contact form submission |
| POST | `/api/newsletter` | Newsletter subscription |
| POST | `/api/downloads` | Track APK download |
| GET | `/api/stats` | Public live stats |
| GET | `/api/health` | Health check |

---

## Founder

**Jainam** — Age 16, India. Student. Builder. Started coding at 11. Building FocusPath to be the mentor he wished he had.

📧 focus@focuspath.ai

---

## License

© 2026 FocusPath. All Rights Reserved.
