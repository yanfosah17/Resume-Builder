from fastapi import FastAPI, Form
from fastapi.responses import StreamingResponse
from resume_generator import generate_resume_text, generate_resume_pdf
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In prod: specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-resume")
async def generate_resume(
    name: str = Form(...),
    role: str = Form(...),
    experience: str = Form(...),
    skills: str = Form(...),
    education: str = Form(...)
):
    user_data = {
        "name": name,
        "role": role,
        "experience": experience,
        "skills": skills,
        "education": education
    }
    resume_text = generate_resume_text(user_data)
    pdf = generate_resume_pdf(resume_text)

    pdf_stream = BytesIO(pdf)
    return StreamingResponse(pdf_stream, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=resume.pdf"})