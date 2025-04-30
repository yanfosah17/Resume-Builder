import { useState } from 'react';

function ResumeForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    experience: '',
    skills: '',
    education: '',
    phone: '',
    email: '',
    location: '',
    summary: '',
    certifications: '',
    languages: '',
    hobbies: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key === 'title' ? 'role' : key, value);
      });

      const response = await fetch('http://localhost:8000/generate-resume', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'resume.txt';
        link.click();
      } else {
        console.error('Failed to generate resume.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 text-white p-8 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Professional Resume Builder</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Target Role" name="title" value={formData.title} onChange={handleChange} />
          <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Location" name="location" value={formData.location} onChange={handleChange} full />
          <TextareaField label="Professional Summary" name="summary" value={formData.summary} onChange={handleChange} full />
          <TextareaField label="Experience" name="experience" value={formData.experience} onChange={handleChange} full />
          <TextareaField label="Skills" name="skills" value={formData.skills} onChange={handleChange} full />
          <TextareaField label="Education" name="education" value={formData.education} onChange={handleChange} full />
          <TextareaField label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} full />
          <TextareaField label="Languages" name="languages" value={formData.languages} onChange={handleChange} full />
          <TextareaField label="Hobbies & Interests" name="hobbies" value={formData.hobbies} onChange={handleChange} full />
        </form>
        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            onClick={handleSubmit}
          >
            Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, full }) => (
  <div className={`flex flex-col ${full ? 'md:col-span-2' : ''}`}>
    <label className="text-sm mb-1">{label}</label>
    <input
      className="p-2 rounded bg-gray-700"
      name={name}
      placeholder={label}
      onChange={onChange}
      value={value}
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, full }) => (
  <div className={`flex flex-col ${full ? 'md:col-span-2' : ''}`}>
    <label className="text-sm mb-1">{label}</label>
    <textarea
      className="p-2 rounded bg-gray-700"
      name={name}
      placeholder={label}
      rows={4}
      onChange={onChange}
      value={value}
    />
  </div>
);

export default ResumeForm;