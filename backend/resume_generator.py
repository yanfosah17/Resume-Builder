import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
from jinja2 import Template

def generate_resume_text(user_data):
    prompt = f"""
    Create a professional resume for the following details:

    Name: {user_data['name']}
    Role: {user_data['role']}
    Experience: {user_data['experience']}
    Skills: {user_data['skills']}
    Education: {user_data['education']}
    Phone: {user_data['phone']}
    Email: {user_data['email']}
    Location: {user_data['location']}
    Summary: {user_data['summary']}
    Certifications: {user_data['certifications']}
    Languages: {user_data['languages']}
    """

    response = client.chat.completions.create(model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.5,
    max_tokens=800)

    generated_text = response.choices[0].message.content
    return generated_text

def generate_resume_pdf(resume_text):
    return resume_text.encode("utf-8")  # Return plain text as bytes instead of PDF