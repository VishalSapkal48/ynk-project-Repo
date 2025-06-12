import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/context/UserContext';

const labels = {
  en: {
    title: 'Enter Your Details',
    nameLabel: 'Name',
    namePlaceholder: 'Enter your name',
    mobileLabel: 'Mobile',
    mobilePlaceholder: 'Enter your mobile number',
    branchLabel: 'Branch',
    branchPlaceholder: 'Enter your branch',
    proceed: 'Proceed',
    error: 'Please fill in all fields',
    validation: {
      nameRequired: 'Name is required',
      mobileRequired: 'Mobile number is required',
      mobileInvalid: 'Please enter a valid 10-digit mobile number',
      branchRequired: 'Branch is required'
    }
  },
  mr: {
    title: 'तुमची माहिती प्रविष्ट करा',
    nameLabel: 'नाव',
    namePlaceholder: 'तुमचे नाव प्रविष्ट करा',
    mobileLabel: 'मोबाइल',
    mobilePlaceholder: 'तुमचा मोबाइल नंबर प्रविष्ट करा',
    branchLabel: 'शाखा',
    branchPlaceholder: 'तुमची शाखा प्रविष्ट करा',
    proceed: 'पुढे जा',
    error: 'कृपया सर्व फील्ड भरा',
    validation: {
      nameRequired: 'नाव आवश्यक आहे',
      mobileRequired: 'मोबाइल नंबर आवश्यक आहे',
      mobileInvalid: 'कृपया वैध 10-अंकी मोबाइल नंबर प्रविष्ट करा',
      branchRequired: 'शाखा आवश्यक आहे'
    }
  },
};

const ContactInfo = ({ language = 'en', toggleLanguage }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = [];
    
    if (!user.name?.trim()) {
      errors.push(labels[language].validation.nameRequired);
    }
    
    if (!user.mobile?.trim()) {
      errors.push(labels[language].validation.mobileRequired);
    } else if (!/^\d{10}$/.test(user.mobile.trim())) {
      errors.push(labels[language].validation.mobileInvalid);
    }
    
    if (!user.branch?.trim()) {
      errors.push(labels[language].validation.branchRequired);
    }
    
    return errors;
  };

  const handleInputChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }
    
    // Clean up data before navigation
    const cleanedUser = {
      ...user,
      name: user.name.trim(),
      mobile: user.mobile.trim(),
      branch: user.branch.trim()
    };
    
    setUser(cleanedUser);
    navigate('/terms-and-condition');
  };

  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const labelClasses = "block text-gray-700 font-medium mb-2";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {labels[language].title}
          </h2>
          {toggleLanguage && (
            <button
              onClick={toggleLanguage}
              className="text-sm text-gray-600 underline hover:text-blue-600 transition-colors"
              type="button"
            >
              {language === 'mr' ? 'English' : 'मराठी'}
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              {labels[language].nameLabel}
            </label>
            <input
              id="name"
              type="text"
              value={user.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={inputClasses}
              placeholder={labels[language].namePlaceholder}
              required
              aria-label={labels[language].nameLabel}
              autoComplete="name"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className={labelClasses}>
              {labels[language].mobileLabel}
            </label>
            <input
              id="mobile"
              type="tel"
              value={user.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className={inputClasses}
              placeholder={labels[language].mobilePlaceholder}
              required
              aria-label={labels[language].mobileLabel}
              pattern="[0-9]{10}"
              maxLength="10"
              autoComplete="tel"
            />
          </div>

          {/* Branch Field */}
          <div>
            <label htmlFor="branch" className={labelClasses}>
              {labels[language].branchLabel}
            </label>
            <input
              id="branch"
              type="text"
              value={user.branch || ''}
              onChange={(e) => handleInputChange('branch', e.target.value)}
              className={inputClasses}
              placeholder={labels[language].branchPlaceholder}
              required
              aria-label={labels[language].branchLabel}
              autoComplete="organization"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {labels[language].proceed}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;