# 🌍 FluentRoam

FluentRoam is a full-stack language learning app designed to help learners **practice speaking, reading, and vocabulary building** through stories, real-time conversations, and AI-powered feedback.

Built with **Next.js, TypeScript, Supabase, Clerk, and multiple AI/translation APIs**, FluentRoam combines modern frontend design with powerful backend integrations.

---

## 🚀 Live Demo

🔗 [Try FluentRoam here](https://your-deployment-link.com) _(Coming soon)_

---

## ✨ Features

- **User Authentication & Billing**
  - Secure authentication and subscriptions with Clerk
  - Webhook integration for managing user events

- **Conversation Practice**
  - Chat or voice call with AI (Vapi + Groq API)
  - Web Speech API for speech-to-text
  - AI feedback on pronunciation and grammar

- **Story Generation**
  - AI-generated stories for reading practice
  - History view to revisit and continue past stories
  - Add new words directly to your vocabulary

- **Vocabulary Builder**
  - Save words from stories and conversations
  - View, manage, and study vocab in a dedicated page
  - _(Future work: spaced repetition system like Anki)_

- **Multilingual Translation**
  - Powered by Azure Translate + DeepL API

- **Error Handling & Routing**
  - Graceful error handling across features
  - Next.js parallel routes for optimized UX

- **State Management & Persistence**
  - Global state with Zustand (persisted storage)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (TypeScript), TailwindCSS, shadcn/ui
- **State Management:** Zustand (with persistence)
- **Auth & Billing:** Clerk
- **Backend & Database:** Supabase (Postgres)
- **APIs & Services:**
  - Vapi (chat & voice practice)
  - Groq API (AI story & feedback)
  - Azure Translation API
  - DeepL API
  - Web Speech API

---

# =====================

# Clerk (Auth & Billing)

# =====================

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/home
WEBHOOK_SECRET=your_webhook_secret

# ===========

# Supabase

# ===========

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ===========

# Vapi

# ===========

NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
VAPI_API_KEY=your_vapi_api_key

# ==================

# Translation APIs

# ==================

DEEPL_AUTH_KEY=your_deepl_auth_key
AZURE_TRANSLATE_API_KEY=your_azure_translate_key

# ===========

# LLM / AI

# ===========

GROQ_API_KEY=your_groq_api_key

## 📂 Project Structure

- `/app` → Next.js app routes (parallel routes included)
- `/components` → Reusable UI components (shadcn/ui)
- `/lib` → Utilities and API integrations
- `/app/pages` → App pages (conversation, story, vocab, etc.)
- `/utils` → Types and stored data like groq prompts

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fluentroam.git

# Navigate into the project
cd fluentroam

# Install dependencies
npm install

# Start the development server
npm run dev
```
