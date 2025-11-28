# Dubai AI Lost & Found

> Privacy-first, AI-powered lost & found prototype for Dubai.  
> Upload a photo of a lost or found item, add where & when, and let visual AI suggest the best matches.

---

## 🌍 Problem

When someone loses an item in Dubai—whether a wallet, headphones, or a bag—they're forced to check multiple lost-and-found desks, apps, and social pages across malls, taxis, metro stations, and events.  
The process is stressful, slow, and unreliable. There is no unified, public, privacy-safe system.

## 💡 Solution

Dubai AI Lost & Found is a **photo-first** web app where users:

- upload a photo of a lost or found item,
- select **where** and **when** it was lost/found,
- and get **AI-powered visual matches** from other reports.

A FastAPI backend uses a pretrained CNN to compute image embeddings and return the most similar items, while a React UI provides a simple, Dubai-optimized experience.

---

## ✨ Key Features

- **Photo-first reporting** – start with an image, not a long form.  
- **Minimal details** – where, when, and an optional short note.  
- **AI visual matching** – CNN embeddings + cosine similarity to find similar items.  
- **Privacy-first design** – architecture ready for automatic blurring of faces and ID details.  
- **City-wide, not per-venue** – built for malls, taxis, metro, airports, schools, and events.  
- **Matches & activity view** – see your lost/found reports and their AI matches.  

---

## 🏗️ Architecture

- **Frontend:** React (Vite + TypeScript)  
  - Views: Home, Report Lost, Report Found, Matches / Activity  
  - Deployed version will call the FastAPI backend via REST.

- **Backend:** FastAPI (Python)  
  - Endpoints for reporting lost/found items and fetching matches  
  - SQLite for item storage  
  - PyTorch + torchvision (ResNet/MobileNet) for image embeddings  
  - Cosine similarity for ranking visual matches

---

## 🚀 Getting Started

> WIP: this section will be updated as the backend and frontend are wired together.

### Backend

```bash
git clone https://github.com/AlBaraa-1/dubai-ai-lost-and-found.git
cd dubai-ai-lost-and-found

python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on http://localhost:8000.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:5173.

---

## 📊 Business & Impact

Free for residents, tourists, and individual users.

Future revenue from B2B dashboards, logistics partnerships, and API integrations with venues and mobility operators.

Key success metrics include:

- % of lost items that receive at least one AI match
- % of matched items successfully reunited
- Median time from report → first match

For the full App Business Canvas, see:
[docs/app-business-canvas.md](docs/app-business-canvas.md)

---

## 📝 License

TBD – choose MIT or similar once finalized.
