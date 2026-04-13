from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Assistant API", version="0.1.0")

# Для MVP разрешаем всё (потом ужесточим)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def health():
    return {"ok": True}

# ---- MVP endpoints (заглушки) ----

@app.get("/tasks")
def list_tasks():
    return {"items": []}

@app.post("/tasks")
def create_task(payload: dict):
    # TODO: сохранить в БД
    return {"created": True, "task": payload}

@app.get("/agents")
def list_agents():
    return {
        "items": [
            {"id": "router", "name": "Главный модератор", "role": "dispatcher"},
            {"id": "planner", "name": "Planner", "role": "planner"},
            {"id": "calories", "name": "Calories", "role": "nutrition"},
        ]
    }
