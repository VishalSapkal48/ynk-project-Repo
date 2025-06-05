import React, { useState } from "react";
import logo from '../../assets/logo.png'; // Ensure this path is correct and handled by your build tool (e.g., Webpack/Vite)

const ContactInfo = () => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    branch: '',
    owner: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});

  const config = {
    en: {
      title: "Register Form",
      subheader: "Reach out to us for any inquiries",
      labels: {
        branch: "Branch",
        owner: "Owner",
        mobile: "Mobile",
        start: "Submit"
      },
      placeholders: {
        branch: "Enter the Branch",
        owner: "Enter the Owner Name",
        mobile: "Enter Mobile Number (10 digits)"
      },
      errors: {
        branch: "Branch is required",
        owner: "Owner name is required",
        mobile: "Enter a valid 10-digit mobile number"
      }
    },
    mr: {
      title: "नोंदणी फॉर्म",
      subheader: "कोणत्याही चौकशीसाठी आमच्याशी संपर्क साधा",
      labels: {
        branch: "शाखा",
        owner: "मालक",
        mobile: "मोबाइल",
        start: "सबमिट करा"
      },
      placeholders: {
        branch: "शाखा प्रविष्ट करा",
        owner: "मालकाचे नाव प्रविष्ट करा",
        mobile: "मोबाइल नंबर प्रविष्ट करा (१० अंक)"
      },
      errors: {
        branch: "शाखा आवश्यक आहे",
        owner: "मालकाचे नाव आवश्यक आहे",
        mobile: "वैध १०-अंकी मोबाइल नंबर प्रविष्ट करा"
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.branch.trim()) newErrors.branch = config[language].errors.branch;
    if (!formData.owner.trim()) newErrors.owner = config[language].errors.owner;
    if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = config[language].errors.mobile;
    return newErrors;
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
    setErrors({}); // Clear errors when switching language
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for the field being edited
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Form submitted with data:", formData);
    // Add your form submission logic here (e.g., API call)
    setFormData({ branch: '', owner: '', mobile: '' }); // Reset form
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-[#dbeeff] p-8 rounded-2xl border border-blue-200 shadow-lg">
        <div className="bg-white flex justify-between items-center mb-6 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-4">
            {logo ? (
              <img src={logo} alt="YNK Logo" className="h-12 w-12 object-contain" />
            ) : (
              <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-bold">YNK</span>
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-800">YNK</h1>
          </div>
          <button
            onClick={handleLanguageToggle}
            className="text-sm text-gray-600 underline hover:text-blue-600 transition-colors"
          >
            {language === 'en' ? 'मराठी' : 'English'}
          </button>
        </div>

        <div className="px-4 py-6 bg-[#dbeeff]">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
            {config[language].title}
          </h2>
          <p className="text-center text-gray-500 mb-6">{config[language].subheader}</p>

          <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg border border-gray-300 p-6 space-y-6">
            <div>
              <label className="font-medium text-gray-700 block mb-1">
                {config[language].labels.branch}
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder={config[language].placeholders.branch}
                className={`w-full p-3 border ${errors.branch ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
              />
              {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-1">
                {config[language].labels.owner}
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                placeholder={config[language].placeholders.owner}
                className={`w-full p-3 border ${errors.owner ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
              />
              {errors.owner && <p className="text-red-500 text-xs mt-1">{errors.owner}</p>}
            </div>
            <div>
              <label className="font-medium text-gray-700 block mb-1">
                {config[language].labels.mobile}
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder={config[language].placeholders.mobile}
                className={`w-full p-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {config[language].labels.start}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;