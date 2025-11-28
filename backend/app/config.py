"""
Configuration settings for Dubai AI Lost & Found backend.
"""

from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
MEDIA_ROOT = BASE_DIR / "media"
LOST_DIR = MEDIA_ROOT / "lost"
FOUND_DIR = MEDIA_ROOT / "found"

# Database
DATABASE_URL = f"sqlite:///{BASE_DIR / 'dubai_lostfound.db'}"

# API Settings
API_V1_PREFIX = "/api"
PROJECT_NAME = "Dubai AI Lost & Found API"
VERSION = "0.1.0"
DESCRIPTION = "Privacy-first, AI-powered lost & found platform for Dubai"

# CORS Settings
ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

# Image Settings
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB

# AI Model Settings
MODEL_NAME = "resnet18"  # or "mobilenet_v2"
EMBEDDING_DIM = 512  # ResNet18 feature dimension
TOP_K_MATCHES = 5  # Number of matches to return

# Ensure media directories exist
LOST_DIR.mkdir(parents=True, exist_ok=True)
FOUND_DIR.mkdir(parents=True, exist_ok=True)
