import openai
from jinja2 import Template
from weasyprint import HTML

# Optional: Load API key securely in real project
openai.api_key = "YOUR_OPENAI_API_KEY"  # Replace this or use env var

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