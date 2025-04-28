import { useState } from 'react';

function ResumeForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    experience: '',
    skills: '',
    education: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('role', formData.title);
      form.append('experience', formData.experience);
      form.append('skills', formData.skills);
      form.append('education', formData.education);

      const response = await fetch('http://localhost:8000/generate-resume', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'resume.pdf';
        link.click();
      } else {
        console.error('Failed to generate resume.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl text-white font-bold mb-6 text-center">Create Your Resume</h1>
        <div className="flex flex-col gap-4">
          <input
            className="p-2 rounded bg-gray-700 text-white"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            className="p-2 rounded bg-gray-700 text-white"
            name="title"
            placeholder="Target Role"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            className="p-2 rounded bg-gray-700 text-white"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            value={formData.experience}
          />
          <textarea
            className="p-2 rounded bg-gray-700 text-white"
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
            value={formData.skills}
          />
          <textarea
            className="p-2 rounded bg-gray-700 text-white"
            name="education"
            placeholder="Education"
            onChange={handleChange}
            value={formData.education}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
          >
            Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;