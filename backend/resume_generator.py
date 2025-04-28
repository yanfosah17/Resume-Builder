import openai
from dotenv import load_dotenv
import os
from jinja2 import Template
from weasyprint import HTML

# Load environment variables from .env
load_dotenv()

# Now fetch your key securely
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_resume_text(user_data):
    prompt = f"""
    Create a professional resume for the following details:

    Name: {user_data['name']}
    Role: {user_data['role']}
    Experience: {user_data['experience']}
    Skills: {user_data['skills']}
    Education: {user_data['education']}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=800
    )

    generated_text = response.choices[0].message.content
    return generated_text

def generate_resume_pdf(resume_text):
    html_template = Template("""
    <html>
    <head><style>body { font-family: Arial; margin: 40px; }</style></head>
    <body>
    <pre>{{ resume_text }}</pre>
    </body>
    </html>
    """)
    rendered_html = html_template.render(resume_text=resume_text)
    pdf_file = HTML(string=rendered_html).write_pdf()
    return pdf_file