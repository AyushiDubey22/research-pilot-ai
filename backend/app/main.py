from fastapi import FastAPI

app=FastAPI(title="Research Pilot API")

app.add_middleware(CORSMiddleware, allow_origin=["http://localhost:5173","http://127.0.0.1:5173"],
                   allowed_methods=["GET","POST","DELETE","OPTIONS"], allow_credntials=False,allowed_headers=["Content-Type","Authorization"])

@app.get("/health")
def healt():
    return{"status":"ok", "service":"researchpilot-api"}