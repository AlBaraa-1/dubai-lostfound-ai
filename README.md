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

### Prerequisites

- **Python 3.11+** (tested on 3.12)
- **Node.js 20+**
- **Git**

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/AlBaraa-1/dubai-lostfound-ai.git
cd dubai-lostfound-ai/backend

# Create and activate virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

Backend will run on **http://127.0.0.1:8000**

- API Docs: http://127.0.0.1:8000/docs
- Health Check: http://127.0.0.1:8000/health

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on **http://localhost:5173**

### Running Backend Tests

```bash
# Make sure you're in the backend directory with venv activated
cd backend
.venv\Scripts\activate  # Windows

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_health.py
```

---

## 🧪 Manual Testing Flow

Follow these steps to verify the full integration:

### 1. Start Backend
```bash
cd backend
.venv\Scripts\activate
uvicorn app.main:app --reload
```

✅ Verify: Visit http://127.0.0.1:8000/health → should return `{"status": "ok"}`

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

✅ Verify: Visit http://localhost:5173 → Dubai AI Lost & Found homepage loads

### 3. Report a Found Item

1. Click **"Report Found"** in navigation
2. Upload an image (e.g., wallet, phone, keys)
3. Fill in:
   - Where: "Mall"
   - When: "Today"
   - Description: "Black wallet" (optional)
4. Click **"Check for owners"**

✅ Expected:
- No errors in browser console
- "AI Suggested Matches" section appears
- Shows "No matches yet" (database is empty initially)
- DevTools Network tab shows: `POST /api/found` → Status **201**

### 4. Report a Lost Item

1. Click **"Report Lost"** in navigation
2. Upload **the same or similar image**
3. Fill in:
   - Where: "Mall"
   - When: "Today"
   - Description: "Lost my wallet"
4. Click **"Find possible matches"**

✅ Expected:
- "AI Suggested Matches" section shows **match cards**
- Each match displays:
  - Image thumbnail
  - Similarity score (e.g., "High match • 85%")
  - Location and time details
- DevTools Network tab shows: `POST /api/lost` → Status **201**

### 5. Check Matches / History

1. Click **"Matches / History"** in navigation
2. Switch between tabs:
   - **"Lost items I reported"** → Shows your lost wallet
   - **"Found items I reported"** → Shows your found wallet

✅ Expected:
- Both items display with their details
- Lost wallet shows the found wallet as a match
- Found wallet shows the lost wallet as a match
- DevTools Network tab shows: `GET /api/history` → Status **200**

### Common Issues

| Issue | Solution |
|-------|----------|
| **CORS errors** | Backend already configured for localhost:5173 ✅ |
| **Images not loading** | Fixed with `Path().name` in `crud.py` ✅ |
| **422 errors** | Check all required fields (image, where, when, title) |
| **Backend port conflict** | Change port: `uvicorn app.main:app --reload --port 8001` |

---

## 🚀 Getting Started

> WIP: this section will be updated as the backend and frontend are wired together.

### Backend

```bash
git clone https://github.com/AlBaraa-1docs/app-business-canvas.md/dubai-lostfound-ai.git
cd dubai-lostfound-ai

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
